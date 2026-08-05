import z from "zod";

import { profileTypeSchema } from "../enums/profileType";
import { averageSchema } from "./average";
import { checkoutSchema } from "./checkout";
import { idSchema } from "./id";

export const profileSchema = z.object({
    id: idSchema,
    name: z.string().trim().nonempty(),
    type: profileTypeSchema,
    average: averageSchema,
    checkout: checkoutSchema,
});

export type Profile = z.infer<typeof profileSchema>;
