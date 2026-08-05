export const sortBy = <T extends object>(key: keyof T, direction: "asc" | "desc" = "asc") => {
    return (a: T, b: T) => {
        const aValue = a[key]?.toString() ?? "";
        const bValue = b[key]?.toString() ?? "";

        return (
            aValue.localeCompare(bValue, undefined, { numeric: true }) *
            (direction === "asc" ? 1 : -1)
        );
    };
};
