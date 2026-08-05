import z from "zod";

import { ProfileType, profileTypeSchema } from "../enums/profileType";
import { idSchema } from "./id";

const profileBase = z.object({
    id: idSchema,
    name: z.string().trim().nonempty(),
    type: profileTypeSchema,
});

export const profileSchema = z.discriminatedUnion("type", [
    profileBase.extend({
        type: z.literal(ProfileType.PLAYER),
        average: z.never().optional(),
        checkout: z.never().optional(),
    }),
    profileBase.extend({
        type: z.literal(ProfileType.DARTBOT),
        average: z.int().min(1).max(180),
        checkout: z.int().min(1).max(100),
    }),
]);

export type Profile = z.infer<typeof profileSchema>;
