import { useEffect } from "react";

export function App() {
    useEffect(() => {
        try {
            void navigator.wakeLock.request("screen");
            // @ts-expect-error
            navigator.virtualKeyboard.overlaysContent = true;
        } catch (_) {}
    }, []);

    return <></>;
}
