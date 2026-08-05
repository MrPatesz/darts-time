import z from "zod";

import { idSchema } from "./id";

export const gameConfigSchema = z.object({
    startscore: z.int().min(101).max(2501),
    legsForSet: z.int().min(1).max(30),
    setsToWin: z.int().min(1).max(30),
    profiles: z
        .array(z.object({ id: idSchema, handicap: z.int().min(0).max(1000) }))
        .min(1)
        .max(4),
});

export type GameConfig = z.infer<typeof gameConfigSchema>;

export const defaultGameConfig: Readonly<GameConfig> = {
    startscore: 501,
    legsForSet: 1,
    setsToWin: 1,
    profiles: Array<{
        id: number;
        handicap: number;
    }>(),
};
