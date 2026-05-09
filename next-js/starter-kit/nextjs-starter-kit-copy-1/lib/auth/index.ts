import { redirect } from "next/navigation"

export const isSignedIn = () => {
  // check
  redirect('/login');
}