import { Group, ActionIcon, Title, Box } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const PageTitle = ({ title }: { title: string }) => {
    return (
        <Group justify="space-between">
            <Link to={"/"}>
                <ActionIcon>
                    <IconArrowLeft />
                </ActionIcon>
            </Link>
            <Title order={2}>{title}</Title>
            <Box w={28} />
        </Group>
    );
};
