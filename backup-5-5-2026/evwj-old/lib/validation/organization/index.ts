import { z } from "zod";

export const CreateOrganizationSchema = z.object({
	name: z.string().min(2, "Organization name must be at least 2 characters"),
	description: z.string().optional(),
	logoUrl: z
		.union([
			z.string().url("Invalid logo URL"),
			z.literal(""),
			z.null(),
			z.undefined(),
		])
		.optional(),
});

export type CreateOrganizationSchemaInfer = z.infer<
	typeof CreateOrganizationSchema
>;

export const InviteMemberSchema = z
	.object({
		organizationId: z.number(),
		userId: z.number().optional(),
		email: z.string().email("Invalid email address").optional(),
		integrationSource: z
			.enum([
				"MANUAL",
				"MS_TEAMS",
				"SLACK",
				"DISCORD",
				"WEBEX",
				"LINKEDIN",
				"FACEBOOK",
				"INSTAGRAM",
				"TIKTOK",
			])
			.default("MANUAL"),
	})
	.refine((data) => data.userId || data.email, {
		message: "Either userId or email must be provided",
		path: ["userId"],
	});

export type InviteMemberSchemaInfer = z.infer<typeof InviteMemberSchema>;

export const UpdateOrganizationSchema = z.object({
	organizationId: z.number(),
	name: z.string().min(2).optional(),
	description: z.string().optional(),
	website: z.string().url().optional().or(z.literal("")),
	contactInfo: z.string().optional(),
});

export type UpdateOrganizationSchemaInfer = z.infer<
	typeof UpdateOrganizationSchema
>;

export const SearchUsersSchema = z.object({
	query: z.string().min(1, "Search query must be at least 1 character"),
	limit: z.number().min(1).max(50).default(10),
});

export type SearchUsersSchemaInfer = z.infer<typeof SearchUsersSchema>;
