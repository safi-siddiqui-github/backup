"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	CheckCircle2,
	Users,
	FileText,
	Lock,
	AlertTriangle,
} from "lucide-react";

interface CommitBudgetModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	totalBudget: number;
	expenseItemsCount: number;
}

export default function CommitBudgetModal({
	open,
	onOpenChange,
	onConfirm,
	totalBudget,
	expenseItemsCount,
}: CommitBudgetModalProps) {
	const handleConfirm = () => {
		onConfirm();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-green-100 p-2 dark:bg-green-900/50">
							<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
						</div>
						<DialogTitle className="text-xl">Commit Budget</DialogTitle>
					</div>
					<DialogDescription className="pt-2">
						You&apos;re about to make your budget visible to vendors and enable
						proposal submissions.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Budget Summary */}
					<Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
						<CardContent className="p-4">
							<h3 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">
								Budget Summary
							</h3>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-lg font-bold text-blue-600">$</span>
									<span className="text-sm text-blue-700 dark:text-blue-300">
										Total Budget: ${totalBudget.toLocaleString()}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-blue-600" />
									<span className="text-sm text-blue-700 dark:text-blue-300">
										Expense Items: {expenseItemsCount}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* What happens when you commit */}
					<div className="space-y-3">
						<h3 className="font-semibold">What happens when you commit:</h3>
						<div className="space-y-2">
							<div className="flex items-start gap-3">
								<div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
									<Users className="h-4 w-4 text-green-600 dark:text-green-400" />
								</div>
								<p className="text-sm text-muted-foreground">
									Vendors can see your expense items and requirements
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
									<FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
								</div>
								<p className="text-sm text-muted-foreground">
									Vendors can submit proposals for your project
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="rounded-full bg-orange-100 p-1.5 dark:bg-orange-900/50">
									<Lock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
								</div>
								<p className="text-sm text-muted-foreground">
									Budget editing will be locked (can be uncommitted later)
								</p>
							</div>
						</div>
					</div>

					{/* Warning Box */}
					<Card className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-[#020617]/80">
						<CardContent className="flex items-start gap-3 p-4">
							<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
							<p className="text-sm text-muted-foreground">
								You can uncommit your budget later if you need to make changes,
								but this may affect vendor proposals already submitted.
							</p>
						</CardContent>
					</Card>
				</div>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button
						type="button"
						onClick={handleConfirm}
						className="bg-green-600 hover:bg-green-700"
					>
						<CheckCircle2 className="mr-2 h-4 w-4" />
						Commit Budget
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
