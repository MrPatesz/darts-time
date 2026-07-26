import { CheckIcon, Group, Select, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "../components/PageTitle";
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
        <Stack>
            <PageTitle title="Settings" />
            <Select
                label={"Color Scheme"}
                value={colorScheme}
                onChange={(newValue) => newValue && setColorScheme(newValue)}
                data={[
                    { label: "System", value: "auto" },
                    { label: "Dark", value: "dark" },
                    { label: "Light", value: "light" },
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
        </Stack>
    );
}
