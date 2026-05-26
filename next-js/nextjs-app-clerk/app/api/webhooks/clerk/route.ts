import prisma from "@/prisma/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventData = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt?.data;
      await prisma?.user?.upsert({
        where: { clerkId: id },
        create: {
          clerkId: id,
          email: email_addresses[0]?.email_address,
          name: `${first_name} ${last_name}`,
        },
        update: {},
      });
    }

    // For Left Users
    // if (eventType === "session.created") {
    //   const { id, email_addresses, first_name, last_name } =
    //     evt?.data?.user ?? {};
    //   await prisma?.user?.upsert({
    //     where: { clerkId: id },
    //     create: {
    //       clerkId: id,
    //       email: email_addresses?.at(0)?.email_address,
    //       name: `${first_name} ${last_name}`,
    //     },
    //     update: {},
    //   });
    // }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }
}
