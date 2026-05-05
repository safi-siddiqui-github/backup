"use client";

import React from "react";
import type { RecentActivity } from "../types";
import { HiXMark } from "react-icons/hi2";

type Props = {
	users: RecentActivity[];
	onClose: () => void;
};

export default function UsersModal({ users, onClose }: Props) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
			<div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 p-4 sm:p-6 shadow-2xl [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
						All Recent Users
					</h3>
					<button
						onClick={onClose}
						className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 cursor-pointer"
					>
						<HiXMark className="h-5 w-5 text-gray-700 dark:text-slate-400" />
					</button>
				</div>

				<div className="space-y-3">
					{users.length === 0 ? (
						<p className="text-sm text-gray-600 dark:text-slate-400">
							No users found.
						</p>
					) : (
						users.map((u) => (
							<div
								key={u.id}
								className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<div className="flex items-center gap-3">
									<div className="h-10 w-10 rounded-full !bg-white dark:!bg-slate-700/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
										{u.name.charAt(0).toUpperCase()}
									</div>
									<div className="min-w-0">
										<p className="font-medium text-gray-900 dark:text-slate-200 truncate">
											{u.name}
										</p>
										<p className="text-sm text-gray-600 dark:text-slate-400 truncate">
											{u.description}
										</p>
									</div>
								</div>

								<div className="text-right">
									<p className="font-semibold text-gray-900 dark:text-slate-200">
										${u.amount.toFixed(2)}
									</p>
									<span className="text-xs text-gray-600 dark:text-slate-400">
										{u.status}
									</span>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
