import z from "zod";

import { profileSchema, type Profile } from "../schemas/profile";
import { defaultBots } from "../utils/defaultBots";
import { useValidLocalStorage } from "./useValidLocalStorage";

export const useProfiles = () => {
    const [profiles, setProfiles] = useValidLocalStorage({
        key: "profiles",
        schema: z.array(profileSchema),
        defaultValue: defaultBots,
    });

    // TODO stats for players

    const add = (profile: Profile) =>
        setProfiles((prev) => {
            const maxId = Math.max(...prev.map((p) => p.id));
            return [...prev, { ...profile, id: maxId + 1 }];
        });

    const remove = (id: number) =>
        setProfiles((prev) => {
            const index = prev.findIndex((p) => p.id === id);
            return prev.toSpliced(index, 1);
        });

    const update = (profile: Profile) =>
        setProfiles((prev) => {
            const index = prev.findIndex((p) => p.id === profile.id);

            return prev.toSpliced(index, 1, profile);
        });

    return { profiles, add, remove, update };
};
