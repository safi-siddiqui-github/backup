"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ChevronDownIcon, Clock, Shield } from "lucide-react";

export default function RsvpSettingBasicComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-4">
				{/*  */}

				{/*  */}
				<div className="flex items-center gap-2">
					{/*  */}
					<Clock />
					{/*  */}
					<CardTitle>Response Setting</CardTitle>
					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-2">
						{/*  */}

						{/*  */}
						<Label>Deadline</Label>
						{/*  */}

						{/*  */}
						<Popover
						// open={true}
						// onOpenChange={}
						>
							{/*  */}

							{/*  */}
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="justify-between font-normal"
								>
									{/* {date ? date.toLocaleDateString() : "Select date"} */}
									Select date
									<ChevronDownIcon />
								</Button>
							</PopoverTrigger>
							{/*  */}

							{/*  */}
							<PopoverContent
								className="w-auto overflow-hidden p-0"
								align="start"
							>
								<Calendar
									mode="single"
									// selected={date}
									captionLayout="dropdown"
									// onSelect={(date) => {
									// setDate(date)
									// setOpen(false)
									// }}
								/>
							</PopoverContent>
							{/*  */}

							{/*  */}
						</Popover>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-2">
						{/*  */}
						<Label>Capacity (Optional)</Label>
						{/*  */}
						<Input placeholder="No limit" />
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-2">
						{/*  */}

						{/*  */}
						<Label className="flex items-center justify-between">
							{/*  */}
							<span>Allow Plus Ones (Max: 3)</span>
							{/*  */}
							<Switch />
							{/*  */}
						</Label>

						{/*  */}

						{/*  */}
						<Input placeholder="Plus Ones: 1..." />
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<Separator />
				{/*  */}

				{/*  */}
				<div className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}
						<Shield />
						{/*  */}
						<CardTitle>Access Control</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<Label className="flex items-center justify-between">
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-2">
							{/*  */}
							<CardTitle>Public Registration</CardTitle>
							{/*  */}
							<CardDescription>
								Allow anyone with the link to RSVP
							</CardDescription>
							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<Switch />
						{/*  */}

						{/*  */}
					</Label>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
