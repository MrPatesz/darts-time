import { TextInput, type TextInputProps } from "@mantine/core";

import { useFieldContext } from "../../contexts/formContexts";
import { getErrorString } from "../../utils/getErrorString";

export const TextField = (
    props: Omit<TextInputProps, "name" | "value" | "onBlur" | "onChange" | "error">,
) => {
    const field = useFieldContext<string>();

    return (
        <TextInput
            {...props}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={getErrorString(field.state.meta.errors)}
        />
    );
};
