import { Button, Modal, Stack } from "@mantine/core";

import { ProfileType } from "../enums/profileType";
import { useAppForm } from "../hooks/useAppForm";
import { useProfiles } from "../hooks/useProfiles";
import { type Profile, profileSchema } from "../schemas/profile";

export function ProfileModal({ id, onClose }: { id: number; onClose: (newId?: number) => void }) {
    const { profiles, add, update } = useProfiles();

    const creation = id === 0;

    const defaultValues: Profile | undefined = creation
        ? { id: 1, name: "", type: ProfileType.PLAYER, average: 1, checkout: 1 }
        : profiles.find((p) => p.id === id);

    const form = useAppForm({
        defaultValues,
        validators: { onSubmit: profileSchema },
        onSubmit: ({ value }) => {
            onClose((creation ? add : update)(value));
        },
    });

    return (
        <form.Subscribe selector={(s) => s.isDirty}>
            {(isDirty) => (
                <Modal
                    opened={true}
                    onClose={onClose}
                    title={`${creation ? "Create" : "Edit"} Profile`}
                    closeOnClickOutside={!isDirty}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void form.handleSubmit();
                        }}
                    >
                        <Stack>
                            <form.AppField name="name">
                                {(field) => <field.TextField label={"Name"} />}
                            </form.AppField>
                            <form.AppField name="type">
                                {(field) => (
                                    <field.EnumField
                                        label={"Type"}
                                        enumObject={ProfileType}
                                        readOnly={!creation}
                                    />
                                )}
                            </form.AppField>
                            <form.Subscribe selector={(s) => s.values.type}>
                                {(type) =>
                                    type === ProfileType.DARTBOT && (
                                        <>
                                            <form.AppField name="average">
                                                {(field) => (
                                                    <field.NumberField
                                                        label={"Average"}
                                                        min={1}
                                                        max={180}
                                                    />
                                                )}
                                            </form.AppField>
                                            <form.AppField name="checkout">
                                                {(field) => (
                                                    <field.NumberField
                                                        label={"Checkout"}
                                                        min={1}
                                                        max={100}
                                                        suffix={"%"}
                                                    />
                                                )}
                                            </form.AppField>
                                        </>
                                    )
                                }
                            </form.Subscribe>
                            <Button type={"submit"} disabled={!isDirty}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Modal>
            )}
        </form.Subscribe>
    );
}
