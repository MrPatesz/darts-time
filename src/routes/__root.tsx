import {
    ActionIcon,
    Box,
    Grid,
    Group,
    MantineProvider,
    SimpleGrid,
    Stack,
    Tooltip,
    type MantineThemeOverride,
} from "@mantine/core";

import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { usePrimaryColor } from "../contexts/primaryColorContext";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
    const [primaryColor] = usePrimaryColor();

    useEffect(() => {
        try {
            void navigator.wakeLock.request("screen");
            // @ts-expect-error
            navigator.virtualKeyboard.overlaysContent = true;
        } catch {}
    }, []);

    return (
        <MantineProvider theme={{ ...theme, primaryColor }}>
            <Box p={"xs"} h={"100dvh"} w={"100dvw"}>
                <Outlet />
            </Box>
        </MantineProvider>
    );
}

const theme: MantineThemeOverride = {
    components: {
        Tooltip: Tooltip.extend({
            defaultProps: {
                events: { hover: true, focus: true, touch: true },
            },
        }),
        Stack: Stack.extend({
            defaultProps: {
                gap: "xs",
            },
        }),
        Group: Group.extend({
            defaultProps: {
                gap: "xs",
            },
        }),
        Grid: Grid.extend({
            defaultProps: {
                gap: "xs",
            },
        }),
        SimpleGrid: SimpleGrid.extend({
            defaultProps: {
                spacing: "xs",
            },
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: "transparent",
            },
        }),
    },
};
