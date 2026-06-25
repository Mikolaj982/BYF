import { assignPlaces } from "./podiumUtils";
import { WithScore } from "../../constants/podiumConfig";

describe('assign podium places', () => {
    it('should return an empty array when no players are provided', () => {
        const players: WithScore[] = [];
        const result = assignPlaces(players);

        expect(result).toEqual([]);
    });

    it('should return first place for a single player', () => {
        const players = [{
            score: 100,
            username: 'testName'
        }];

        const result = assignPlaces(players);

        expect(result[0].place).toEqual(1);
    });

    it('should sort descending by results and assign places descending from the highest score', () => {
        const scores = [{ score: 60 }, { score: 100 }, { score: 80 }];
        const expectedPlaces = [1, 2, 3];
        const expectedScores = [100, 80, 60];

        const result = assignPlaces(scores);

        const mappedScores = result.map(player => player.score);

        const mappedPlaces = result.map(player => player.place);

        expect(mappedScores).toEqual(expectedScores);

        expect(mappedPlaces).toEqual(expectedPlaces);
    });

    it('should assign the same place for the same score', () => {
        const scores = [{ score: 100 }, { score: 100 }, { score: 80 }];
        const expectedPlaces = [1, 1, 2];

        const result = assignPlaces(scores);

        const mappedPlaces = result.map(player => player.place);

        expect(mappedPlaces).toEqual(expectedPlaces);
    });
})