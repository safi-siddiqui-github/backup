import prisma from "@/prisma/database";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Here");

  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Recieved webhook with id ${id} adn event type of ${eventType}`,
    );

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstname: first_name,
          lastname: last_name,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error Verifying Webhook", err);
    return new Response("Error Verifying Webhook", { status: 400 });
  }
}
