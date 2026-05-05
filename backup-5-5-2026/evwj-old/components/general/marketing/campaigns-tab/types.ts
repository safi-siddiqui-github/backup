import { CampaignDetail } from "./campaign-drawer/types";

// Extend CampaignDetail to include date for timeline view
export interface Campaign extends CampaignDetail {
	date: Date;
}

export type CampaignStatus = "scheduled" | "draft" | "completed";
