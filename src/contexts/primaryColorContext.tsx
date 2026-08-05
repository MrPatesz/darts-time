import { createContext, useContext, type ReactNode } from "react";

import { PrimaryColor, primaryColorSchema } from "../enums/primaryColor";
import { useValidLocalStorage } from "../hooks/useValidLocalStorage";
import type { SetState } from "../types/setState";

const primaryColorContext = createContext<readonly [PrimaryColor, SetState<PrimaryColor>] | null>(
    null,
);

export const PrimaryColorProvider = ({ children }: { children: ReactNode }) => {
    const value = useValidLocalStorage({
        key: "mantine-primary-color-value",
        schema: primaryColorSchema,
        defaultValue: PrimaryColor.cyan,
    });

    return <primaryColorContext.Provider value={value}>{children}</primaryColorContext.Provider>;
};

export const usePrimaryColor = () => {
    const context = useContext(primaryColorContext);

    if (!context) {
        throw Error("usePrimaryColor must be used within PrimaryColorProvider!");
    }

    return context;
};
