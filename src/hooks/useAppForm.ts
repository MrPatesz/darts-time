import { createFormHook } from "@tanstack/react-form";

import { EnumField } from "../components/fields/EnumField";
import { NumberField } from "../components/fields/NumberField";
import { TextField } from "../components/fields/TextField";
import { fieldContext, formContext } from "../contexts/formContexts";

export const { useAppForm } = createFormHook({
    fieldComponents: {
        NumberField,
        TextField,
        EnumField,
    },
    formComponents: {},
    fieldContext,
    formContext,
});
