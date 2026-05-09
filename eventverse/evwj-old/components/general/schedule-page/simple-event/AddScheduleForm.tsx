"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DayCard, ScheduleItem } from "../types";

type Props = {
	day: DayCard;
	onAdd: (item: ScheduleItem) => void;
};

export default function AddScheduleForm({ day, onAdd }: Props) {
	const [title, setTitle] = useState("");
	const [type, setType] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [notificationTime, setNotificationTime] = useState("");
	const [notificationMsg, setNotificationMsg] = useState(
		"Please arrive 10 minutes early",
	);

	// Inline TimePicker using Select primitives
	function TimePicker({
		value,
		onChange,
		className,
		step = 15,
	}: {
		value: string;
		onChange: (v: string) => void;
		className?: string;
		step?: number;
	}) {
		if (!step || step <= 0) step = 15;
		let hour = "";
		let minute = "";
		if (value) {
			const parts = value.split(":");
			hour = parts[0] ?? "";
			minute = parts[1] ?? "";
		}

		const hours = Array.from({ length: 24 }).map((_, i) =>
			String(i).padStart(2, "0"),
		);
		const minutes: string[] = [];
		for (let mm = 0; mm < 60; mm += step)
			minutes.push(String(mm).padStart(2, "0"));

		return (
			<div className={`flex items-center gap-2 ${className ?? ""}`}>
				<Select
					value={hour}
					onValueChange={(v) => onChange(`${v}:${minute || "00"}`)}
				>
					<SelectTrigger className="w-24">
						<SelectValue placeholder="HH" />
					</SelectTrigger>
					<SelectContent>
						{hours.map((hr) => (
							<SelectItem key={hr} value={hr}>
								{hr}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<span className="text-sm text-gray-400">:</span>

				<Select
					value={minute}
					onValueChange={(v) => onChange(`${hour || "00"}:${v}`)}
				>
					<SelectTrigger className="w-20">
						<SelectValue placeholder="MM" />
					</SelectTrigger>
					<SelectContent>
						{minutes.map((mm) => (
							<SelectItem key={mm} value={mm}>
								{mm}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<div className="ml-3 flex items-center gap-2">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							const now = new Date();
							const rounded = Math.ceil(now.getMinutes() / step) * step;
							const h = String(
								(now.getHours() + Math.floor(rounded / 60)) % 24,
							).padStart(2, "0");
							const m = String(rounded % 60).padStart(2, "0");
							onChange(`${h}:${m}`);
						}}
					>
						Now
					</Button>
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							const now = new Date();
							now.setMinutes(now.getMinutes() + step);
							const h = String(now.getHours()).padStart(2, "0");
							const m = String(
								(Math.ceil(now.getMinutes() / step) * step) % 60,
							).padStart(2, "0");
							onChange(`${h}:${m}`);
						}}
					>
						+{step}m
					</Button>
				</div>
			</div>
		);
	}

	const timeToMinutes = (t: string) => {
		const [h, m] = t.split(":").map(Number);
		return h * 60 + m;
	};

	const handleAdd = () => {
		if (!title.trim()) {
			toast.error("Please provide an agenda title");
			return;
		}
		if (!startTime || !endTime) {
			toast.error("Please select start and end times");
			return;
		}
		if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
			toast.error("End time must be after start time");
			return;
		}

		const item: ScheduleItem = {
			id: `item-${Date.now()}`,
			tag: type || "General",
			title: title.trim(),
			time: `${startTime} - ${endTime}`,
			description: description.trim(),
			location: location.trim() || "TBA",
			notification:
				notificationTime === "0" || notificationTime === ""
					? null
					: notificationMsg,
			color: day.color,
		};

		onAdd(item);
	};

	return (
		<div className="space-y-4">
			<div>
				<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
					Agenda Title *
				</label>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="e.g., Opening Keynote, Coffee Break"
					className="mt-2"
				/>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<div>
					<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
						Agenda Type
					</label>
					<Select value={type} onValueChange={(v) => setType(v)}>
						<SelectTrigger className="mt-2 w-full">
							<SelectValue placeholder="Select type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Session">Session</SelectItem>
							<SelectItem value="Workshop">Workshop</SelectItem>
							<SelectItem value="Break">Break</SelectItem>
							<SelectItem value="Keynote">Keynote</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
						Location
					</label>
					<Select value={location} onValueChange={(v) => setLocation(v)}>
						<SelectTrigger className="mt-2 w-full">
							<SelectValue placeholder="Select location" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Room A">Room A</SelectItem>
							<SelectItem value="Conference Hall">Conference Hall</SelectItem>
							<SelectItem value="Room B">Room B</SelectItem>
							<SelectItem value="Main Hall">Main Hall</SelectItem>
							<SelectItem value="Outdoor Stage">Outdoor Stage</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<div>
					<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
						Start Time
					</label>
					<TimePicker
						value={startTime}
						onChange={setStartTime}
						className="mt-2"
					/>
				</div>
				<div>
					<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
						End Time
					</label>
					<TimePicker value={endTime} onChange={setEndTime} className="mt-2" />
				</div>
			</div>

			<div>
				<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
					Description
				</label>
				<Textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Add any additional details..."
					className="mt-2"
				/>
			</div>

			<div>
				<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
					Notification Time
				</label>
				<Select
					value={notificationTime}
					onValueChange={(v) => setNotificationTime(v)}
				>
					<SelectTrigger className="mt-2 w-full">
						<SelectValue placeholder="No notification" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">None</SelectItem>
						<SelectItem value="5">5 minutes before</SelectItem>
						<SelectItem value="10">10 minutes before</SelectItem>
						<SelectItem value="30">30 minutes before</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div>
				<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
					Notification Message
				</label>
				<Input
					value={notificationMsg}
					onChange={(e) => setNotificationMsg(e.target.value)}
					placeholder="e.g., Please arrive 10 minutes early"
					className="mt-2"
				/>
			</div>

			<div className="flex justify-end gap-2">
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<DialogClose asChild>
					<Button onClick={handleAdd}>Add Item</Button>
				</DialogClose>
			</div>
		</div>
	);
}
