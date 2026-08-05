import z from "zod";

import { averageSchema } from "../schemas/average";
import { checkoutSchema } from "../schemas/checkout";
import { idSchema } from "../schemas/id";
import { useValidLocalStorage } from "./useValidLocalStorage";

const historyItemSchema = z.object({
    players: z.array(
        z.object({
            playerId: idSchema,
            average: averageSchema,
            checkout: checkoutSchema,
        }),
    ),
    winnerId: idSchema,
    date: z.coerce.date(),
});

type HistoryItem = z.infer<typeof historyItemSchema>;

export const useHistory = () => {
    const [history, setHistory] = useValidLocalStorage({
        key: "history",
        schema: z.array(historyItemSchema),
        defaultValue: [],
    });

    const add = (item: HistoryItem) => setHistory((prev) => [...prev, item]);

    const remove = (index: number) => setHistory((prev) => prev.toSpliced(index, 1));

    const getStats = (playerId: number) => {
        return history
            .map((item) => {
                const player = item.players.find((p) => p.playerId === playerId);
                return (
                    player && {
                        average: player.average,
                        checkout: player.checkout,
                        won: item.winnerId === playerId,
                        date: item.date,
                    }
                );
            })
            .filter(Boolean);
    };

    return { history, add, remove, getStats };
};
