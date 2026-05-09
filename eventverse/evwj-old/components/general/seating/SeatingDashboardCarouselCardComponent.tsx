"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientPropType } from "@/type";

import { Clock, Edit, Menu, Table, Trash, Users } from "lucide-react";
import Link from "next/link";

export default function SeatingDashboardCarouselCardComponent(
	prop: ClientPropType,
) {
	//
	const { slug, seatingSlug } = prop;
	//
	return (
		<div className="flex flex-col">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					<div className="flex flex-wrap items-start justify-between">
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-1">
							{/*  */}

							{/*  */}
							<Link
								// href={`${Routes.web.auth.dashboardEvents}/${slug}/${Routes.web.auth.dashboardSettings}/${seatingSlug}/${Routes.web.auth.dashboard.events.seating.arrangement}/test`}
								href={"#"}
								className="hover:underline"
							>
								{/*  */}
								<CardTitle>Dinner Setup</CardTitle>
								{/*  */}
							</Link>
							{/*  */}

							{/*  */}
							<CardDescription>Formal dinner arrangement</CardDescription>
							{/*  */}

							{/*  */}
							<Badge>Active</Badge>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<DropdownMenu>
							{/*  */}

							{/*  */}
							<DropdownMenuTrigger asChild>
								<Button variant={"outline"} size={"icon-sm"}>
									<Menu />
								</Button>
							</DropdownMenuTrigger>
							{/*  */}

							{/*  */}
							<DropdownMenuContent className="flex w-32 flex-col" align="end">
								{/*  */}

								{/*  */}
								<DropdownMenuItem>
									<Edit />
									Edit
								</DropdownMenuItem>
								{/*  */}

								{/*  */}
								<DropdownMenuItem variant="destructive">
									<Trash />
									Delete
								</DropdownMenuItem>
								{/*  */}

								{/*  */}
							</DropdownMenuContent>
							{/*  */}

							{/*  */}
						</DropdownMenu>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}
						<Clock />
						{/*  */}
						<CardDescription>09:00 AM - 10:00 AM</CardDescription>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-2">
						{/*  */}

						{/*  */}
						<div className="flex items-center justify-between">
							{/*  */}

							{/*  */}
							<div className="flex items-center gap-2">
								{/*  */}
								<Table />
								{/*  */}
								<CardDescription>Tables</CardDescription>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<CardTitle>10</CardTitle>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<div className="flex items-center justify-between">
							{/*  */}

							{/*  */}
							<div className="flex items-center gap-2">
								{/*  */}
								<Users />
								{/*  */}
								<CardDescription>Capacity</CardDescription>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<CardTitle>10</CardTitle>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<div className="flex items-center justify-between">
							{/*  */}

							{/*  */}
							<div className="flex items-center gap-2">
								{/*  */}
								<Users />
								{/*  */}
								<CardDescription>Assigned</CardDescription>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<CardTitle>10</CardTitle>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
		</div>
	);
}
