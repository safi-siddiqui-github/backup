"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Armchair,
	Box,
	Building,
	Palette,
	Plus,
	RotateCcw,
	Table,
	Zap,
} from "lucide-react";

export default function SeatingArrangementCanvasComponent() {
	//
	return (
		<div className="flex flex-col gap-4">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-wrap items-center justify-between gap-4">
					{/*  */}

					{/*  */}
					<div className="flex flex-col">
						{/*  */}

						{/*  */}
						<DropdownMenu>
							{/*  */}

							{/*  */}
							<DropdownMenuTrigger asChild>
								{/*  */}
								<Button variant={"outline"}>
									<Plus />
									Add To Canvas
								</Button>
								{/*  */}
							</DropdownMenuTrigger>
							{/*  */}

							{/*  */}
							<DropdownMenuContent className="w-56" align="start">
								{/*  */}

								{/*  */}
								<DropdownMenuLabel>Special</DropdownMenuLabel>
								{/*  */}
								<DropdownMenuItem>
									<Table />
									Add Table
								</DropdownMenuItem>
								{/*  */}
								<DropdownMenuItem>
									<Armchair />
									Add Chair
								</DropdownMenuItem>
								{/*  */}

								{/*  */}
								<DropdownMenuSeparator />
								{/*  */}

								{/*  */}
								<DropdownMenuLabel>General</DropdownMenuLabel>
								{/*  */}
								<DropdownMenuItem>
									<Box /> Add Objects
								</DropdownMenuItem>
								{/*  */}
								<DropdownMenuItem>
									<Palette />
									Add Decor
								</DropdownMenuItem>
								{/*  */}
								<DropdownMenuItem>
									<Building />
									Add Vencor Booth Tent
								</DropdownMenuItem>
								{/*  */}

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
					<div className="flex flex-wrap items-center gap-4">
						{/*  */}

						{/*  */}
						<Button>
							<Zap />
							Smart Assign
						</Button>
						{/*  */}

						{/*  */}
						<Button variant={"outline"}>
							<RotateCcw />
							Reset
						</Button>
						{/*  */}

						{/*  */}
						<Button variant={"outline"}>
							<Box />
							Vendor Presets
						</Button>
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
			<Card>
				{/*  */}
				<CardContent className="flex flex-wrap">
					{/*  */}

					{/*  */}
					<div className="bg-secondary h-96 flex-1 rounded-xl"></div>
					{/*  */}

					{/*  */}
					<div className="flex max-w-sm flex-1 flex-col"></div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
		</div>
	);
}
