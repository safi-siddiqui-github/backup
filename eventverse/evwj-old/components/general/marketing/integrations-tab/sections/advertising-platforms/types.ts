export interface AdAccount {
	id: string;
	name: string;
	accountId: string;
	balance: string;
	activeCampaigns: number;
}

export const DEMO_AD_ACCOUNTS: AdAccount[] = [
	{
		id: "1",
		name: "Main Ad Account",
		accountId: "123-234-242",
		balance: "2,450.00",
		activeCampaigns: 3,
	},
	{
		id: "2",
		name: "Secondary Ad Account",
		accountId: "456-789-012",
		balance: "1,200.50",
		activeCampaigns: 5,
	},
	{
		id: "3",
		name: "Test Ad Account",
		accountId: "789-012-345",
		balance: "500.00",
		activeCampaigns: 1,
	},
];

export const PERMISSIONS = [
	"Create and manage ad campaigns",
	"Read campaign performance metrics",
	"Manage audience targeting",
	"Access billing information",
];
