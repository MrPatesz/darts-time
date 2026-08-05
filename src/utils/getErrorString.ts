import z from "zod";

const zodError = z.object({ message: z.string() });

const isZodError = (e: unknown): e is z.infer<typeof zodError> => zodError.safeParse(e).success;

export const getErrorString = (errors: Array<unknown>) =>
    errors
        .filter(isZodError)
        .map((e) => e.message)
        .join(",");
