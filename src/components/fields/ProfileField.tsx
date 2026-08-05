import { Select, type SelectProps } from "@mantine/core";

import { useFieldContext } from "../../contexts/formContexts";
import { useProfiles } from "../../hooks/useProfiles";
import type { Id } from "../../schemas/id";
import { getErrorString } from "../../utils/getErrorString";
import { toPascalCase } from "../../utils/toPascalCase";

export const ProfileField = ({
    disabledIds,
    ...props
}: Omit<
    SelectProps<Id>,
    "name" | "value" | "onBlur" | "onChange" | "error" | "data" | "clearable"
> & {
    disabledIds?: Array<Id>;
}) => {
    const field = useFieldContext<Id>();

    const { profiles } = useProfiles();

    const data = Object.entries(Object.groupBy(profiles, (p) => p.type))
        .map(([k, v]) => ({
            group: toPascalCase(k),
            items: v.map((p) => ({
                value: p.id,
                label: p.name,
                disabled: disabledIds?.includes(p.id),
            })),
        }))
        .toReversed();

    return (
        <Select
            {...props}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => {
                if (e) {
                    field.handleChange(e);
                }
            }}
            error={getErrorString(field.state.meta.errors)}
            data={data}
            clearable={false} // TODO nullability
        />
    );
};
