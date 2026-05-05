"use client";

import Tab from "../Tab";
import getQuestionIcon from "../getQuestionIcon";

type QuestionBrief = { id: string; type: string; totalResponses: number };

type Props = {
	questions: QuestionBrief[];
	activeId: string;
	onSelect: (id: string) => void;
};

export default function QuestionTabs({ questions, activeId, onSelect }: Props) {
	return (
		<div className="overflow-x-auto pb-2 mb-6">
			<nav className="flex space-x-2" aria-label="Questions">
				{questions.map((q, i) => (
					<Tab
						key={q.id}
						isActive={q.id === activeId}
						onClick={() => onSelect(q.id)}
						count={q.totalResponses}
					>
						<span
							className={
								q.id === activeId
									? "text-white flex items-center"
									: "text-gray-500 dark:text-gray-400 flex items-center"
							}
						>
							{getQuestionIcon(q.type)}
							<span className="ml-1.5">Q{i + 1}</span>
						</span>
					</Tab>
				))}
			</nav>
		</div>
	);
}
