export type PodiumEntry = {
    color: string;
};

export type PodiumConfig = Record<number, PodiumEntry>;

export const podiumConfig: PodiumConfig = {
    1: { color: '#E67E22' },
    2: { color: '#7F8C8D' },
    3: { color: '#A04020' },
};

export const getMedal = (place: number): PodiumEntry => {
    return podiumConfig[place] ?? null;
};