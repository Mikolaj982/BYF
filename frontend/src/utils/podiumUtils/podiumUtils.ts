import { podiumConfig, PodiumEntry, WithScore } from "../../constants/podiumConfig";

export const getMedal = (place: number): PodiumEntry => {
    return podiumConfig[place] ?? null;
};

export const assignPlaces = <T extends WithScore>(players: T[]): (T & { place: number })[] => {
    return players
        .toSorted((a, b) => b.score - a.score)
        .reduce<(T & { place: number })[]>((acc, player, index, arr) => {
            const place = index === 0
                ? 1 : arr[index].score === arr[index - 1].score
                    ? acc[index - 1].place : acc[index - 1].place + 1;

            acc.push({ ...player, place })
            return acc;
        }, []);
};