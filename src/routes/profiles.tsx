import { ActionIcon, Stack, Table, Tooltip } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useContextMenu } from "mantine-contextmenu";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";

import { PageTitle } from "../components/PageTitle";
import { ProfileModal } from "../components/ProfileModal";
import { useProfiles } from "../hooks/useProfiles";
import { type Profile } from "../schemas/profile";
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
