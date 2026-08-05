import z from "zod";

import { ProfileType } from "../enums/profileType";
import { profileSchema, type Profile } from "../schemas/profile";
import { calculateAverage } from "../utils/calculateAverage";
import { defaultBots } from "../utils/defaultBots";
import { useHistory } from "./useHistory";
import { useValidLocalStorage } from "./useValidLocalStorage";

export const useProfiles = () => {
    const [_profiles, setProfiles] = useValidLocalStorage({
        key: "profiles",
        schema: z.array(profileSchema),
        defaultValue: defaultBots,
    });

    const { getStats } = useHistory();

    const profiles = _profiles.map((p) => {
        if (p.type === ProfileType.DARTBOT) {
            return p;
        }
        const stats = getStats(p.id);
        return {
            ...p,
            average: calculateAverage(stats.map((s) => s.average)),
            checkout: calculateAverage(stats.map((s) => s.checkout)),
        };
    });

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
