import z from "zod";

const profileBase = z.object({
    type: z.enum(["player", "bot"]),
    name: z.string().trim().nonempty(),
});

export const profile = z.discriminatedUnion("type", [
    profileBase.extend({
        type: z.literal("player"),
        average: z.never().optional(),
        checkoutPercentage: z.never().optional(),
    }),
    profileBase.extend({
        type: z.literal("bot"),
        average: z.int().min(1).max(180),
        checkoutPercentage: z.number().min(0.01).max(1).multipleOf(0.01),
    }),
]);

export type Profile = z.infer<typeof profile>;
