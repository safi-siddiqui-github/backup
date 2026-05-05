export type FullNotification = Partial<Notification> & {
	user?: {
		id?: number;
		firstname?: string | null;
		lastname?: string | null;
		email?: string | null;
	};
};
