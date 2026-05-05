import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Lightbulb } from "lucide-react";

interface EmptySeatingStateProps {
	onCreateFirst: () => void;
}

const EmptySeatingState = ({ onCreateFirst }: EmptySeatingStateProps) => {
	return (
		<div className="container mx-auto px-6 py-20">
			<Card className="max-w-2xl mx-auto">
				<CardContent className="p-12 text-center">
					<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
						<Plus className="w-10 h-10 text-primary" />
					</div>

					<h2 className="text-2xl font-bold text-foreground mb-3">
						No Seating Arrangements Yet
					</h2>

					<p className="text-muted-foreground mb-8 max-w-md mx-auto">
						Get started by creating your first seating arrangement. You can
						design table layouts, manage guest assignments, and organize
						multiple venues and sections.
					</p>

					<Button size="lg" onClick={onCreateFirst} className="mb-8">
						<Plus className="w-5 h-5 mr-2" />
						Create Your First Arrangement
					</Button>

					<div className="bg-muted/30 rounded-lg p-6 text-left">
						<div className="flex items-start gap-3">
							<Lightbulb className="w-5 h-5 text-primary mt-0.5" />
							<div>
								<h3 className="font-semibold text-foreground mb-2">
									Quick Tips
								</h3>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Organize by location (e.g., Main Hall, Garden Area)</li>
									<li>
										• Create sections within locations (e.g., VIP Area, Main
										Floor)
									</li>
									<li>
										• Design multiple arrangements for different times or events
									</li>
									<li>• Choose between table-based or seat-based layouts</li>
								</ul>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default EmptySeatingState;
