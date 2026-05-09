"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function onAuthenticatedUser() {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 302,
      };
    }

    const userExists = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (userExists) {
      return {
        status: 200,
        user: userExists,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        profileImage: user.imageUrl,
      },
    });

    if (!newUser) {
      return {
        status: 500,
        message: "Failed to create user",
      };
    }

    return {
      status: 201,
      user: newUser,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
}
