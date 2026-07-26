import { Button, Stack, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <Stack h={"100%"}>
            <Stack flex={1} justify="center" align="center">
                {/* TODO <Image src={"pwa-192x192.png"} /> */}
                <Title>Darts Time</Title>
            </Stack>
            <Link to={"/"}>
                <Button w={"100%"} disabled>
                    Play
                </Button>
            </Link>
            <Link to={"/"}>
                <Button w={"100%"} disabled>
                    Statistics
                </Button>
            </Link>
            <Link to={"/profiles"}>
                <Button w={"100%"}>Profiles</Button>
            </Link>
            <Link to="/settings">
                <Button w={"100%"}>Settings</Button>
            </Link>
        </Stack>
    );
}
