import { createFormHook } from "@tanstack/react-form";

import { EnumField } from "../components/fields/EnumField";
import { NumberField } from "../components/fields/NumberField";
import { ProfileField } from "../components/fields/ProfileField";
import { TextField } from "../components/fields/TextField";
import { fieldContext, formContext } from "../contexts/formContexts";

export const { useAppForm } = createFormHook({
    fieldComponents: {
        NumberField,
        TextField,
        EnumField,
        ProfileField,
    },
    formComponents: {},
    fieldContext,
    formContext,
});
