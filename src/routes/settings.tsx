import {
    Box,
    Button,
    CheckIcon,
    Group,
    Select,
    Stack,
    Text,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";

import { usePrimaryColor } from "../contexts/primaryColorContext";
import { primaryColors } from "../utils/primaryColors";
import { toPascalCase } from "../utils/toPascalCase";

export const Route = createFileRoute("/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [primaryColor, setPrimaryColor] = usePrimaryColor();

    return (
        <Stack h={"100%"}>
            <Title order={2} ta={"center"}>
                Settings
            </Title>
            <Select
                label={"Color Scheme"}
                value={colorScheme}
                onChange={(newValue) => newValue && setColorScheme(newValue)}
                data={[
                    { label: "Dark", value: "dark" },
                    { label: "Light", value: "light" },
                    { label: "System", value: "auto" },
                ]}
            />
            <Select
                label={"Primary Color"}
                value={primaryColor}
                onChange={(newValue) => newValue && setPrimaryColor(newValue)}
                data={primaryColors.map((value) => ({ label: toPascalCase(value), value }))}
                renderOption={({ option, checked }) => (
                    <Group gap="xs">
                        {checked && <CheckIcon opacity={0.4} size={"0.8em"} />}
                        <Text size="sm" c={option.value}>
                            {option.label}
                        </Text>
                    </Group>
                )}
            />
            <Box flex={1} />
            <Link to={"/"}>
                <Button w={"100%"}>Back</Button>
            </Link>
        </Stack>
    );
}
