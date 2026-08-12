import { ActionIcon, Button, Modal, Stack, Table, Tooltip } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useContextMenu } from "mantine-contextmenu";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";

import { PageTitle } from "../components/PageTitle";
import { ProfileType } from "../enums/profileType";
import { useAppForm } from "../hooks/useAppForm";
import { useProfiles } from "../hooks/useProfiles";
import { profileSchema, type Profile } from "../schemas/profile";
import { sortBy } from "../utils/sortBy";
import { toPascalCase } from "../utils/toPascalCase";

export const Route = createFileRoute("/profiles")({
    component: RouteComponent,
});

function RouteComponent() {
    const [id, setId] = useState<number | null>(null);
    const { profiles, remove } = useProfiles();

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Profile>>({
        columnAccessor: "id",
        direction: "asc",
    });

    const records = profiles.toSorted(
        sortBy(sortStatus.columnAccessor as keyof Profile, sortStatus.direction),
    );

    const isMobile = useMediaQuery("(max-width: 768px)");

    const { showContextMenu } = useContextMenu();

    return (
        <>
            {id !== null && <ProfileModal id={id} onClose={() => setId(null)} />}
            <Stack h={"100%"}>
                <PageTitle
                    title="Profiles"
                    rightIcon={
                        <Tooltip label={"Create"}>
                            <ActionIcon onClick={() => setId(0)}>
                                <IconPlus />
                            </ActionIcon>
                        </Tooltip>
                    }
                />
                <Table.ScrollContainer
                    minWidth={undefined}
                    maxHeight={"100%"}
                    scrollAreaProps={{ scrollbars: "y" }}
                >
                    <DataTable
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        withColumnBorders
                        // TODO stickyHeader={true}
                        // TODO highlightOnHover
                        onRowContextMenu={({ event, record }) => {
                            showContextMenu([
                                {
                                    key: "edit",
                                    style: { height: 32 },
                                    icon: <IconPencil />,
                                    onClick: () => setId(record.id),
                                },
                                {
                                    key: "delete",
                                    style: { height: 32 },
                                    icon: <IconTrash />,
                                    onClick: () => {
                                        if (confirm("Would you like to delete this profile?")) {
                                            remove(record.id);
                                        }
                                    },
                                },
                            ])(event);
                        }}
                        records={records}
                        columns={[
                            {
                                accessor: "name",
                                sortable: true,
                                noWrap: true,
                            },
                            {
                                accessor: "type",
                                sortable: true,
                                render: (p) => toPascalCase(p.type),
                            },
                            {
                                accessor: "average",
                                title: isMobile ? "Avg." : "Average",
                                sortable: true,
                                render: (p) => p.average || "-",
                            },
                            {
                                accessor: "checkout",
                                title: isMobile ? "%" : "Checkout",
                                sortable: true,
                                render: (p) => (p.checkout ? `${p.checkout}%` : "-"),
                            },
                        ]}
                    />
                </Table.ScrollContainer>
            </Stack>
        </>
    );
}

function ProfileModal({ id, onClose }: { id: number; onClose: () => void }) {
    const { profiles, add, update } = useProfiles();

    const creation = id === 0;

    const defaultValues: Profile | undefined = creation
        ? { id: 1, name: "", type: ProfileType.PLAYER, average: 1, checkout: 1 }
        : profiles.find((p) => p.id === id);

    const form = useAppForm({
        defaultValues,
        validators: { onSubmit: profileSchema },
        onSubmit: ({ value }) => {
            (creation ? add : update)(value);
            onClose();
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
