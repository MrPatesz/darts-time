import { Group, ActionIcon, Title, Box, Tooltip } from "@mantine/core";
import { IconArrowLeft, type ReactNode } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const PageTitle = ({ title, rightIcon }: { title: string; rightIcon?: ReactNode }) => {
    return (
        <Group justify="space-between">
            <Link to={"/"}>
                <Tooltip label={"Menu"}>
                    <ActionIcon pt={"xs"}>
                        <IconArrowLeft />
                    </ActionIcon>
                </Tooltip>
            </Link>
            <Title order={2}>{title}</Title>
            {rightIcon ?? <Box w={28} />}
        </Group>
    );
};
