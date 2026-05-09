import ReservationCard from "./ReservationCard";
import { Reservation } from "../types";

type Props = {
	reservations: Reservation[];
	onSend: (id: string) => void;
	onCancel: (id: string) => void;
};

export default function ReservationsList({
	reservations,
	onSend,
	onCancel,
}: Props) {
	return (
		<div className="grid grid-cols-1 gap-6">
			{reservations.map((r) => (
				<ReservationCard
					key={r.id}
					reservation={r}
					onSend={onSend}
					onCancel={onCancel}
				/>
			))}
		</div>
	);
}
