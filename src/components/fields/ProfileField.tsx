import { ActionIcon, Select, Tooltip, type SelectProps } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useReducer } from "react";

import { useFieldContext } from "../../contexts/formContexts";
import { useProfiles } from "../../hooks/useProfiles";
import type { Id } from "../../schemas/id";
import { getErrorString } from "../../utils/getErrorString";
import { toPascalCase } from "../../utils/toPascalCase";
import { ProfileModal } from "../ProfileModal";

export const ProfileField = ({
    disabledIds,
    ...props
}: Omit<SelectProps<Id>, "name" | "value" | "onBlur" | "onChange" | "error" | "data"> & {
    disabledIds?: Array<Id>;
}) => {
    const field = useFieldContext<Id>();

    const { profiles } = useProfiles();

    const [showCreationModal, toggleShowCreationModal] = useReducer((prev) => !prev, false);

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
        <>
            {showCreationModal && (
                <ProfileModal
                    id={0}
                    onClose={(newId) => {
                        toggleShowCreationModal();
                        if (newId) {
                            field.handleChange(newId);
                        }
                    }}
                />
            )}
            <Select
                {...props}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(newValue) => {
                    if (newValue) {
                        field.handleChange(newValue);
                    }
                }}
                error={getErrorString(field.state.meta.errors)}
                data={data}
                rightSectionPointerEvents={"all"}
                rightSection={
                    <Tooltip label={"Create"}>
                        <ActionIcon
                            onClick={toggleShowCreationModal}
                            size={"sm"}
                            disabled={Boolean(field.state.value)}
                        >
                            <IconPlus />
                        </ActionIcon>
                    </Tooltip>
                }
            />
        </>
    );
};
