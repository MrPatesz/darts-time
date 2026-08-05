import z from "zod";

export const primaryColorSchema = z.enum([
    "red",
    "pink",
    "grape",
    "violet",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "green",
    "lime",
    "yellow",
    "orange",
]);

export const primaryColors = primaryColorSchema.options;

export const PrimaryColor = primaryColorSchema.enum;

export type PrimaryColor = z.infer<typeof primaryColorSchema>;
