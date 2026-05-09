import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Chair, Guest, Table } from "@/types/venue";
import { FileImage, FileText, Files, Printer } from "lucide-react";
import { useState } from "react";

interface PrintDialogProps {
	open: boolean;
	onClose: () => void;
	tables: Table[];
	chairs?: Chair[];
	arrangementName: string;
	onExportDiagram: () => Promise<void>;
}

type PrintOption = "diagram" | "list";

const PrintDialog = ({
	open,
	onClose,
	tables,
	chairs = [],
	arrangementName,
	onExportDiagram,
}: PrintDialogProps) => {
	const [printOption, setPrintOption] = useState<PrintOption>("diagram");
	const [isExporting, setIsExporting] = useState(false);

	const generateGuestList = () => {
		const assignments: Array<{
			location: string;
			guest: Guest;
			dietary?: string;
		}> = [];

		// Add table assignments
		tables.forEach((table) => {
			Object.entries(table.seatAssignments || {}).forEach(
				([seatNumber, guest]) => {
					assignments.push({
						location: `${table.name} - Seat ${seatNumber}`,
						guest,
						dietary: guest.dietary !== "None" ? guest.dietary : undefined,
					});
				},
			);
		});

		// Add chair assignments
		chairs.forEach((chair) => {
			if (chair.guest) {
				assignments.push({
					location: chair.name,
					guest: chair.guest,
					dietary:
						chair.guest.dietary !== "None" ? chair.guest.dietary : undefined,
				});
			}
		});

		return assignments.sort((a, b) => a.guest.name.localeCompare(b.guest.name));
	};

	const exportGuestList = () => {
		const assignments = generateGuestList();

		const content = `
      <html>
        <head>
          <title>${arrangementName} - Guest Seating List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .dietary { background-color: #fef3c7; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <h1>${arrangementName}</h1>
          <p><strong>Total Guests:</strong> ${assignments.length}</p>
          <table>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Group</th>
                <th>Dietary</th>
              </tr>
            </thead>
            <tbody>
              ${assignments
				.map(
					({ location, guest, dietary }) => `
                <tr>
                  <td>${guest.name}</td>
                  <td>${guest.email}</td>
                  <td>${location}</td>
                  <td>${guest.group}</td>
                  <td>${dietary ? `<span class="dietary">${dietary}</span>` : "-"}</td>
                </tr>
              `,
				)
				.join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

		const newWindow = window.open("", "_blank");
		if (newWindow) {
			newWindow.document.write(content);
			newWindow.document.close();
			newWindow.print();
		}
	};

	const handlePrint = async () => {
		setIsExporting(true);
		try {
			switch (printOption) {
				case "diagram":
					await onExportDiagram();
					break;
				case "list":
					exportGuestList();
					break;
			}
		} catch (error) {
			console.error("Print operation failed:", error);
			alert("Print operation failed. Please try again.");
		} finally {
			setIsExporting(false);
			onClose();
		}
	};

	const totalGuests = generateGuestList().length;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Printer className="h-5 w-5" />
						Print/Export Options
					</DialogTitle>
					<DialogDescription>
						Choose what you'd like to print or export for "{arrangementName}"
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="flex items-center gap-4 rounded-lg bg-gray-50 p-3">
						<div className="text-sm">
							<div className="font-medium">{tables.length} tables</div>
							<div className="text-gray-600">
								{chairs.length} individual chairs
							</div>
						</div>
						<div className="text-sm">
							<div className="font-medium">{totalGuests} assigned guests</div>
						</div>
					</div>

					<RadioGroup
						value={printOption}
						onValueChange={(value: PrintOption) => setPrintOption(value)}
					>
						<div className="space-y-3">
							<div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
								<RadioGroupItem value="diagram" id="diagram" />
								<Label htmlFor="diagram" className="flex-1 cursor-pointer">
									<div className="flex items-center gap-2">
										<FileImage className="h-4 w-4 text-blue-600" />
										<div>
											<div className="font-medium">Seating Diagram Only</div>
											<div className="text-xs text-gray-600">
												Export the visual layout as an image (JPEG)
											</div>
										</div>
									</div>
								</Label>
							</div>

							<div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
								<RadioGroupItem value="list" id="list" />
								<Label htmlFor="list" className="flex-1 cursor-pointer">
									<div className="flex items-center gap-2">
										<FileText className="h-4 w-4 text-green-600" />
										<div>
											<div className="font-medium">Guest List Only</div>
											<div className="text-xs text-gray-600">
												Printable table of guest assignments
											</div>
										</div>
									</div>
								</Label>
							</div>
						</div>
					</RadioGroup>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose} disabled={isExporting}>
						Cancel
					</Button>
					<Button onClick={handlePrint} disabled={isExporting}>
						<Printer className="mr-2 h-4 w-4" />
						{isExporting
							? "Processing..."
							: printOption === "diagram"
								? "Export"
								: "Print"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PrintDialog;
