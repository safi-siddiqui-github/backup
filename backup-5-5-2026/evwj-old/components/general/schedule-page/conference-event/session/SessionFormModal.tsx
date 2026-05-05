"use client";
import React, { useEffect, useState } from "react";
import { X, Clock, UserPlus, Trash2 } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { Session as SessionType } from "./types";

type SessionFormModalProps = {
	session: SessionType | null;
	onClose: () => void;
	onSave: (session: SessionType) => void;
};

const TimeInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({
	value,
	onChange,
}) => (
	<div className="relative">
		<input
			type="time"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
		/>
		<Clock className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
	</div>
);

const SessionFormModal: React.FC<SessionFormModalProps> = ({
	session,
	onClose,
	onSave,
}) => {
	const isEditMode = Boolean(session);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [sessionType, setSessionType] = useState("");
	const [track, setTrack] = useState("");
	const [date, setDate] = useState("");
	const [location, setLocation] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [capacity, setCapacity] = useState(50);
	const [skillLevel, setSkillLevel] = useState("");
	const [speakers, setSpeakers] = useState<string[]>([""]);
	const [tags, setTags] = useState("");

	useEffect(() => {
		if (isEditMode && session) {
			setTitle(session.title || "");
			setDescription(session.description || "");
			setSessionType(session.type || "");
			setTrack(session.track || "");
			setDate(session.date || "");
			setLocation(session.location || "");
			const [start, end] = (session.time || " - ").split(" - ");
			setStartTime(start || "");
			setEndTime(end || "");
			setCapacity(session.capacity || 50);
			setSkillLevel(session.skillLevel || "");
			setSpeakers(
				session.speakers && session.speakers.length > 0
					? session.speakers
					: [""],
			);
			setTags(session.tags || "");
		} else {
			setTitle("");
			setDescription("");
			setSessionType("");
			setTrack("");
			setDate("");
			setLocation("");
			setStartTime("");
			setEndTime("");
			setCapacity(50);
			setSkillLevel("All Levels");
			setSpeakers([""]);
			setTags("");
		}
	}, [session, isEditMode]);

	const handleSpeakerChange = (index: number, value: string) => {
		const newSpeakers = [...speakers];
		newSpeakers[index] = value;
		setSpeakers(newSpeakers);
	};

	const addSpeaker = () => setSpeakers([...speakers, ""]);
	const removeSpeaker = (index: number) => {
		if (speakers.length > 1)
			setSpeakers(speakers.filter((_, i) => i !== index));
		else setSpeakers([""]);
	};

	const handleSubmit = () => {
		const sessionData: SessionType = {
			id: isEditMode && session ? session.id : Date.now().toString(),
			title,
			description,
			type: sessionType,
			track,
			date,
			location,
			time: `${startTime} - ${endTime}`,
			capacity,
			skillLevel,
			speakers: speakers.filter((s) => s),
			tags: tags
				.split(",")
				.map((t) => t.trim())
				.join(", "),
			status: "New",
			registered: isEditMode && session ? session.registered : 0,
			checkedIn: isEditMode && session ? session.checkedIn : 0,
			attendees: isEditMode && session ? session.attendees : [],
			colors:
				isEditMode && session
					? session.colors
					: {
							border: "border-gray-200 dark:border-gray-700",
							bg: "bg-gray-50 dark:bg-gray-900/20",
							darkBg: "dark:bg-gray-900/30",
							tagBg: "bg-gray-100",
							tagText: "text-gray-700",
							darkTagBg: "dark:bg-gray-800",
							darkTagText: "dark:text-gray-200",
						},
		};

		onSave(sessionData);
		onClose();
	};

	const typeOptions = [
		{ value: "keynote", label: "Keynote" },
		{ value: "workshop", label: "Workshop" },
		{ value: "session", label: "Session" },
		{ value: "panel", label: "Panel" },
	];
	const trackOptions = [
		{ value: "AI & Machine Learning", label: "AI & Machine Learning" },
		{ value: "Cloud & DevOps", label: "Cloud & DevOps" },
		{ value: "Security & Privacy", label: "Security & Privacy" },
	];
	const dateOptions = [
		{ value: "Day 1 - Nov 4, 2025", label: "Day 1 - Nov 4, 2025" },
		{ value: "Day 2 - Nov 5, 2025", label: "Day 2 - Nov 5, 2025" },
		{ value: "Day 3 - Nov 6, 2025", label: "Day 3 - Nov 6, 2025" },
	];
	const locationOptions = [
		{ value: "Main Hall", label: "Main Hall" },
		{ value: "Workshop Room A", label: "Workshop Room A" },
		{ value: "Auditorium", label: "Auditorium" },
		{ value: "Workshop Room B", label: "Workshop Room B" },
	];
	const skillOptions = [
		{ value: "All Levels", label: "All Levels" },
		{ value: "Beginner", label: "Beginner" },
		{ value: "Intermediate", label: "Intermediate" },
		{ value: "Advanced", label: "Advanced" },
	];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative max-h-[90vh] w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-900">
				<div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						{isEditMode ? "Edit Session" : "Create New Session"}
					</h2>
					<button
						onClick={onClose}
						className="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				<div className="max-h-[calc(90vh-160px)] space-y-4 overflow-y-auto p-4 sm:p-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Session Title *
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter session title"
							className="mt-1 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Session description"
							rows={3}
							className="mt-1 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Session Type *
							</label>
							<SelectDropdown
								label="Session Type *"
								value={sessionType}
								onChange={(e) => setSessionType(e.target.value)}
								options={typeOptions}
								placeholder="Select session type"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Track (Optional)
							</label>
							<SelectDropdown
								label="Track (Optional)"
								value={track}
								onChange={(e) => setTrack(e.target.value)}
								options={trackOptions}
								placeholder="Select track"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Date *
							</label>
							<SelectDropdown
								label="Date *"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								options={dateOptions}
								placeholder="Select date"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Location
							</label>
							<SelectDropdown
								label="Location"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								options={locationOptions}
								placeholder="Select location"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Start Time *
							</label>
							<TimeInput value={startTime} onChange={setStartTime} />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								End Time *
							</label>
							<TimeInput value={endTime} onChange={setEndTime} />
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Capacity
							</label>
							<input
								type="number"
								value={capacity}
								onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
								className="mt-1 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Skill Level
							</label>
							<SelectDropdown
								label="Skill Level"
								value={skillLevel}
								onChange={(e) => setSkillLevel(e.target.value)}
								options={skillOptions}
								placeholder="Select skill level"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Speakers
						</label>
						<div className="space-y-2">
							{speakers.map((speaker, index) => (
								<div key={index} className="flex items-center gap-2">
									<input
										type="text"
										value={speaker}
										onChange={(e) => handleSpeakerChange(index, e.target.value)}
										placeholder={`Speaker ${index + 1} name`}
										className="mt-1 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
									/>
									{speakers.length > 1 && (
										<button
											onClick={() => removeSpeaker(index)}
											className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-500"
										>
											<Trash2 className="h-5 w-5" />
										</button>
									)}
								</div>
							))}
						</div>
						<button
							onClick={addSpeaker}
							className="mt-2 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50"
						>
							<UserPlus className="h-4 w-4" />
							Add Speaker
						</button>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Tags (comma-separated)
						</label>
						<input
							type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							placeholder="e.g., ai, machine-learning, beginner"
							className="mt-1 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
						/>
					</div>
				</div>

				<div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
					<button
						onClick={onClose}
						className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
					>
						{isEditMode ? "Update Session" : "Create Session"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SessionFormModal;
