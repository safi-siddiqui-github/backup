"use server";

import { DeleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function (_previousState: unknown) {
  // Delete Sesion
  await DeleteSession();
  redirect('/authentication');
}