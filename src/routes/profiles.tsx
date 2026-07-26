import { Stack, Table } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "../components/PageTitle";
import { defaultBots } from "../utils/defaultBots";

export const Route = createFileRoute("/profiles")({
    component: RouteComponent,
});

function RouteComponent() {
    // TODO manage player and bot profiles

    return (
        <Stack h={"100%"}>
            <PageTitle title="Profiles" />
            <Table.ScrollContainer
                minWidth={undefined}
                maxHeight={"100%"}
                scrollAreaProps={{ scrollbars: "y" }}
            >
                <Table // TODO Mantine DataTable
                    withColumnBorders
                    stickyHeader={true}
                    data={{
                        head: ["Name", /* "Type", */ "Average", "Checkout"],
                        body: defaultBots.map((b) => [
                            b.name,
                            /* b.type, */
                            b.average,
                            `${Math.round((b.checkoutPercentage ?? 0) * 100)}%`,
                        ]),
                    }}
                />
            </Table.ScrollContainer>
        </Stack>
    );
}
