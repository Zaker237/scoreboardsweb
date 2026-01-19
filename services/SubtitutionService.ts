import { URLs } from "../constants/urls";
import { ISubtitution } from "../interfaces/ISubtitution";

export class SubtitutionService {
  public static async getMatchSubtitutions(
    matchId: number,
  ): Promise<ISubtitution[]> {
    const response = await fetch(
      URLs.MATCHS.SUBTITUTIONS.replace(
        "$championshipId",
        matchId.toString())
    );
    return response.json() as Promise<ISubtitution[]>;
  }
}
