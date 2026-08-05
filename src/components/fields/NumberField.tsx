import { NumberInput, type NumberInputProps } from "@mantine/core";
import z from "zod";

import { useFieldContext } from "../../contexts/formContexts";
import { getErrorString } from "../../utils/getErrorString";

export const NumberField = ({
    onChange,
    ...props
}: Omit<NumberInputProps, "name" | "value" | "onBlur" | "onChange" | "error"> & {
    onChange?: (newValue: number) => void;
}) => {
    const field = useFieldContext<number>();

    return (
        <NumberInput
            {...props}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(value) => {
                const result = z.coerce.number().safeParse(value);
                if (result.success) {
                    field.handleChange(result.data);
                    onChange?.(result.data);
                }
            }}
            error={getErrorString(field.state.meta.errors)}
        />
    );
};
