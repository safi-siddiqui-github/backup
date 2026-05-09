import AddPost from "@/components/app/add-post";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany();

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-xl">Posts {posts?.length}</h2>

      <div className="flex">
        <AddPost />
      </div>

      <div className="flex flex-col">
        {posts?.map(({ title }) => (
          <div className="flex">
            <p className="text-sm">{title}</p>
            <Button variant="link" asChild>
              <Link href="/login">Visit</Link>
              <ArrowRight />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
