import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import type z from "zod";

export const useValidLocalStorage = <const T>({
    key,
    schema,
    defaultValue,
}: {
    key: string;
    schema: z.ZodType<T>;
    defaultValue: NoInfer<T>;
}) => {
    const validDefaultValue = schema.parse(defaultValue);

    const [state, setState] = useLocalStorage(key, validDefaultValue);

    const stateValidation = schema.safeParse(state);

    const validState = stateValidation.success ? stateValidation.data : validDefaultValue;

    useEffect(() => {
        if (!stateValidation.success) {
            setState(validDefaultValue);
        }
    }, [stateValidation.success, setState, validDefaultValue]);

    return [validState, setState] as const;
};
