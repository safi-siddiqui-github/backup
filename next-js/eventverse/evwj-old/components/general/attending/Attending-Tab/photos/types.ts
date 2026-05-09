import React from "react";

export type Photo = {
	id: string;
	imageUrl: string;
	title?: string;
	uploader?: string;
	uploaderId?: string;
	likes?: number;
	comments?: number;
	tags?: string[];
	uploadDate?: string | number;
	liked?: boolean;
	uploadedBy?: string;
	timestamp?: string;
};

export type StatCardProps = {
	icon: React.ComponentType<any>;
	title: string;
	value: React.ReactNode;
	colorClass?: string;
};
