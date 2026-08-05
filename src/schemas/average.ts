import z from "zod";

export const averageSchema = z.int().min(1).max(180);
