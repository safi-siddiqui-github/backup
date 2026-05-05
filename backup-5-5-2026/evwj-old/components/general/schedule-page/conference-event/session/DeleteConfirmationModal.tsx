"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Session as SessionType } from "./types";

type DeleteConfirmationModalProps = {
	session: SessionType;
	onClose: () => void;
	onConfirm: (id: number | string) => void;
};

export default function DeleteConfirmationModal({
	session,
	onClose,
	onConfirm,
}: DeleteConfirmationModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative w-full max-w-md rounded-lg bg-white shadow-xl dark:bg-gray-900">
				<div className="flex items-start p-6">
					<div className="shrink-0 rounded-full bg-red-100 p-3 dark:bg-red-900/50">
						<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
					</div>
					<div className="ml-4 flex-1">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							Delete Session
						</h3>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
							Are you sure you want to delete the session{" "}
							<span className="font-medium">{session.title}</span>? This action
							cannot be undone.
						</p>
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
						onClick={() => {
							onConfirm(session.id);
							onClose();
						}}
						className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
					>
						Delete Session
					</button>
				</div>
			</div>
		</div>
	);
}
