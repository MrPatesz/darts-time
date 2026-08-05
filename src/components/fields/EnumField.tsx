import { Select, type SelectProps } from "@mantine/core";

import { useFieldContext } from "../../contexts/formContexts";
import type { Enum } from "../../types/enum";
import { getErrorString } from "../../utils/getErrorString";
import { toPascalCase } from "../../utils/toPascalCase";

export const EnumField = <E extends string>({
    enumObject,
    onChange,
    ...props
}: Omit<SelectProps<E>, "name" | "value" | "onBlur" | "error" | "data" | "clearable"> & {
    enumObject: Enum<E>;
}) => {
    const field = useFieldContext<E>();
    const data = Object.values<E>(enumObject).map((e) => ({ value: e, label: toPascalCase(e) }));

    return (
        <Select
            {...props}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e, option) => {
                if (e) {
                    field.handleChange(e);
                    onChange?.(e, option);
                }
            }}
            error={getErrorString(field.state.meta.errors)}
            data={data}
            clearable={false} // TODO nullability
        />
    );
};
