import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useContext, type ReactNode } from "react";

import type { SetState } from "../types/setState";
import type { PrimaryColor } from "../utils/primaryColors";

const primaryColorContext = createContext<[PrimaryColor, SetState<PrimaryColor>] | null>(null);

export const PrimaryColorProvider = ({ children }: { children: ReactNode }) => {
    const value = useLocalStorage<PrimaryColor>("mantine-primary-color-value", "cyan");

    return <primaryColorContext.Provider value={value}>{children}</primaryColorContext.Provider>;
};

export const usePrimaryColor = () => {
    const context = useContext(primaryColorContext);

    if (!context) {
        throw Error("usePrimaryColor must be used within PrimaryColorProvider!");
    }

    return context;
};
