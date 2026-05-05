export interface SocialAccount {
	id: string;
	name: string;
	type: "profile" | "page" | "business";
	username?: string;
	followers?: number;
}

export const DEMO_SOCIAL_ACCOUNTS: Record<string, SocialAccount[]> = {
	linkedin: [
		{
			id: "1",
			name: "Personal Profile",
			type: "profile",
			username: "@john_doe",
		},
		{
			id: "2",
			name: "Company Page",
			type: "page",
			username: "@acme_corp",
			followers: 12500,
		},
	],
	instagram: [
		{
			id: "1",
			name: "Personal Account",
			type: "profile",
			username: "@johndoe",
			followers: 8500,
		},
		{
			id: "2",
			name: "Business Account",
			type: "business",
			username: "@acme_brand",
			followers: 25000,
		},
	],
	facebook: [
		{
			id: "1",
			name: "Personal Profile",
			type: "profile",
			username: "John Doe",
		},
		{
			id: "2",
			name: "Acme Corp Page",
			type: "page",
			username: "Acme Corporation",
			followers: 50000,
		},
	],
	tiktok: [
		{
			id: "1",
			name: "Personal Account",
			type: "profile",
			username: "@johndoe",
			followers: 15000,
		},
	],
	twitter: [
		{
			id: "1",
			name: "Personal Account",
			type: "profile",
			username: "@johndoe",
			followers: 3200,
		},
	],
};

export const SOCIAL_PERMISSIONS = [
	"Post content on your behalf",
	"Read your profile information",
	"Access your media library",
	"Manage comments and interactions",
];
