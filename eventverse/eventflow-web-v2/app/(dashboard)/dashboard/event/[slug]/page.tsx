import { findEvent } from "@/actions/event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/routes";
import { Component } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const event = await findEvent(slug);

  const activeModules = event?.modules?.filter((each) => each?.isActive);

  return (
    <div className="flex flex-col gap-10 p-4 md:px-10 md:py-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold md:text-3xl md:font-bold">
            {event?.name}
          </p>
        </div>
        <p className="">{event?.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <p className="text-xl font-bold text-blue-600">
              {event?.modules?.length}
            </p>
            <CardDescription>Total Modules</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <p className="text-xl font-bold text-green-600">
              {activeModules?.length}
            </p>
            <CardDescription>Active Modules</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <p className="text-xl font-bold text-purple-600">5</p>
            <CardDescription>Categories</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <p className="text-xl font-bold text-orange-600">0</p>
            <CardDescription>Beta Features</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {event?.modules?.map((each) => (
          <Card key={each?.id}>
            <CardHeader className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-1 items-center gap-2">
                <Component />
                <div className="flex flex-col">
                  <CardTitle>{each?.category?.name}</CardTitle>
                  <CardDescription>
                    {each?.category?.description}
                  </CardDescription>
                </div>
              </div>

              <Badge>{each?.isActive ? "Active" : "Inactive"}</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="font-medium">Key Features</p>
              <div className="flex flex-col">
                <p className="">{each?.category?.optionOne}</p>
                <p className="">{each?.category?.optionTwo}</p>
                <p className="">{each?.category?.optionThree}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-1 flex-col items-start justify-end">
              <Button asChild>
                <Link
                  href={`${Routes.dashboardEvent}/${slug}/${Routes.dashboardModule}/${each?.slug}`}
                >
                  View Module
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
