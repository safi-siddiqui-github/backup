import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { viewToken } from "@/sanity/env";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ 
    token: viewToken,
   }),
});