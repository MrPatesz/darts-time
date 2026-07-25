import "@mantine/core/styles.css";
import { Box, MantineProvider } from "@mantine/core";
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
        } catch (_) {}
    }, []);

    return (
        <MantineProvider defaultColorScheme={"dark"} theme={{ primaryColor }}>
            <Box p={"xs"} h={"100dvh"} w={"100dvw"}>
                <Outlet />
            </Box>
        </MantineProvider>
    );
}
