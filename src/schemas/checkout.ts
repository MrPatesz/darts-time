import z from "zod";

export const checkoutSchema = z.int().min(1).max(100);
