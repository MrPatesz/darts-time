import z from "zod";

export const profileTypeSchema = z.enum(["PLAYER", "DARTBOT"]);

export const ProfileType = profileTypeSchema.enum;

export type ProfileType = z.infer<typeof profileTypeSchema>;
