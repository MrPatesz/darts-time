import { ActionIcon, Button, Group, Paper, Select, Stack, Text } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageTitle } from "../components/PageTitle";
import { useAppForm } from "../hooks/useAppForm";
import { defaultGameConfig, gameConfigSchema } from "../schemas/gameConfig";
import { getErrorString } from "../utils/getErrorString";

export const Route = createFileRoute("/play")({
    component: RouteComponent,
});

function RouteComponent() {
    const [enableSets, setEnableSets] = useState(false);

    const form = useAppForm({
        defaultValues: defaultGameConfig,
        validators: { onSubmit: gameConfigSchema },
        onSubmit: async (/* { value } */) => {
            // navigate("match");
            // TODO save game configs
        },
    });

    return (
        <form
            style={{ height: "100%" }}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
            }}
        >
            <Stack h={"100%"}>
                <PageTitle title="Play" />
                <Paper>
                    <Stack>
                        <Group>
                            <form.AppField name="startscore">
                                {(field) => (
                                    <field.NumberField
                                        flex={1}
                                        label={"Startscore"}
                                        step={50}
                                        allowNegative={false}
                                        allowDecimal={false}
                                        min={101}
                                        max={2501}
                                    />
                                )}
                            </form.AppField>
                            <Select
                                flex={1}
                                label={"Format"}
                                value={enableSets ? "Sets" : "Legs"}
                                data={["Legs", "Sets"]}
                                onChange={(newValue) => {
                                    setEnableSets((prev) =>
                                        newValue ? newValue === "Sets" : prev,
                                    );
                                    form.setFieldValue("setsToWin", 1);
                                }}
                            />
                        </Group>
                        <Group>
                            {enableSets && (
                                <form.AppField name="setsToWin">
                                    {(field) => (
                                        <field.NumberField
                                            flex={1}
                                            label={"First to"}
                                            allowNegative={false}
                                            allowDecimal={false}
                                            min={1}
                                            max={30}
                                        />
                                    )}
                                </form.AppField>
                            )}
                            <form.AppField name="legsForSet">
                                {(field) => (
                                    <field.NumberField
                                        flex={1}
                                        label={enableSets ? "Legs per set" : "First to"}
                                        allowNegative={false}
                                        allowDecimal={false}
                                        min={1}
                                        max={30}
                                    />
                                )}
                            </form.AppField>
                        </Group>
                    </Stack>
                </Paper>
                <form.Field name="profiles" mode="array">
                    {({ state, pushValue, removeValue }) => (
                        <Paper flex={1} pos={"relative"}>
                            <Stack
                                p={"xs"}
                                pos={"absolute"}
                                top={0}
                                right={0}
                                bottom={0}
                                left={0}
                                style={{ overflow: "auto" }}
                            >
                                <Group>
                                    <Text flex={1}>Profiles</Text>
                                    <ActionIcon
                                        onClick={() => pushValue({ id: 0, handicap: 0 })}
                                        disabled={state.value.length === 4}
                                    >
                                        <IconPlus />
                                    </ActionIcon>
                                </Group>
                                <form.Subscribe selector={(d) => d.values.profiles}>
                                    {(profiles) =>
                                        profiles.map((_, index) => (
                                            <Group key={index} align={"top"}>
                                                <form.AppField name={`profiles[${index}].id`}>
                                                    {(field) => (
                                                        <field.ProfileField
                                                            flex={1}
                                                            disabledIds={profiles.map((p) => p.id)}
                                                        />
                                                    )}
                                                </form.AppField>
                                                <form.AppField name={`profiles[${index}].handicap`}>
                                                    {(field) => (
                                                        <field.NumberField
                                                            flex={0.5}
                                                            prefix={"+"}
                                                            allowDecimal={false}
                                                            allowNegative={false}
                                                            min={0}
                                                            max={1000}
                                                            step={50}
                                                        />
                                                    )}
                                                </form.AppField>
                                                <ActionIcon onClick={() => removeValue(index)}>
                                                    <IconTrash />
                                                </ActionIcon>
                                            </Group>
                                        ))
                                    }
                                </form.Subscribe>
                                {Boolean(state.meta.errors.length) && (
                                    <Text c={"var(--mantine-color-error)"} size={"xs"}>
                                        {getErrorString(state.meta.errors)}
                                    </Text>
                                )}
                            </Stack>
                        </Paper>
                    )}
                </form.Field>
                <Button type={"submit"}>Start</Button>
            </Stack>
        </form>
    );
}
