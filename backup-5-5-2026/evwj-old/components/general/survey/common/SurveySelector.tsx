"use client";

type SurveySelectorProps = {
	selectedSurveyId: string;
	onSelectSurvey: (surveyId: string) => void;
	surveys: Array<{ id: number; name: string }>;
};

export default function SurveySelector({
	selectedSurveyId,
	onSelectSurvey,
	surveys,
}: SurveySelectorProps) {
	return (
		<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600 shadow-lg rounded-xl p-6 sm:p-8 transition-all duration-300">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-2">
				Select Survey to Share
			</h2>
			<p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
				Choose a survey to generate its shareable link and QR code
			</p>
			<select
				value={selectedSurveyId}
				onChange={(e) => onSelectSurvey(e.target.value)}
				className="w-full p-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 [background-color:white] dark:[background-color:#020617]"
			>
				<option value="" disabled>
					Choose a survey
				</option>
				{surveys.map((survey) => (
					<option key={survey.id} value={survey.id}>
						{survey.name}
					</option>
				))}
			</select>
		</div>
	);
}
