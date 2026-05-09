"use client";

import ResponseRow from "./ResponseRow";
import Pagination from "../Pagination";
import { AnyResponse } from "../../types/survey-types";

type Props = {
	responses: AnyResponse[];
	renderAnswer: (resp: AnyResponse) => React.ReactNode;
	total: number;
	currentPage: number;
	itemsPerPage: number;
	onPageChange: (p: number) => void;
};

export default function ResponsesList({
	responses,
	renderAnswer,
	total,
	currentPage,
	itemsPerPage,
	onPageChange,
}: Props) {
	return (
		<div>
			<h4 className="text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
				Individual Responses
			</h4>
			<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl border border-gray-200 dark:border-slate-600 divide-y divide-gray-200 dark:divide-slate-600">
				{responses.map((r) => (
					<ResponseRow
						key={r.id}
						respondent={r.respondent}
						timestamp={r.timestamp}
						answer={renderAnswer(r)}
					/>
				))}
			</div>
			{total > itemsPerPage && (
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(total / itemsPerPage)}
					onPageChange={onPageChange}
					totalItems={total}
					itemsPerPage={itemsPerPage}
				/>
			)}
		</div>
	);
}
