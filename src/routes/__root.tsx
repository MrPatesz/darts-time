import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
    useEffect(() => {
        try {
            void navigator.wakeLock.request("screen");
            // @ts-expect-error
            navigator.virtualKeyboard.overlaysContent = true;
        } catch (_) {}
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
}
