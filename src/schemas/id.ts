import z from "zod";

export const idSchema = z.int().min(1);

export type Id = z.infer<typeof idSchema>;
