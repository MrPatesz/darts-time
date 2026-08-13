import {
    ActionIcon,
    Box,
    Grid,
    Group,
    Input,
    MantineProvider,
    NumberInput,
    Paper,
    Select,
    SimpleGrid,
    Stack,
    Tooltip,
    type MantineThemeOverride,
} from "@mantine/core";

import "@mantine/core/styles.css";
import "mantine-contextmenu/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "../styles/root.css";

import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ContextMenuProvider } from "mantine-contextmenu";

import { usePrimaryColor } from "../contexts/primaryColorContext";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
    const [primaryColor] = usePrimaryColor();

    return (
        <MantineProvider theme={{ ...theme, primaryColor }}>
            <ContextMenuProvider>
                <Box p={"xs"} h={"100dvh"} w={"100dvw"}>
                    <Outlet />
                </Box>
            </ContextMenuProvider>
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
                wrap: "nowrap",
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
        Paper: Paper.extend({
            defaultProps: {
                withBorder: true,
                p: "xs",
            },
        }),
        Input: Input.extend({
            defaultProps: {
                flex: 1,
            },
        }),
        NumberInput: NumberInput.extend({
            defaultProps: {
                allowDecimal: false,
                allowNegative: false,
            },
        }),
        Select: Select.extend({
            defaultProps: {
                clearable: false,
                allowDeselect: false,
            },
        }),
    },
};
