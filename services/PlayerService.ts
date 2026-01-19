import { URLs } from "../constants/urls";
import {
  IPlayer,
  IPlayerStats,
  IPlayerContracts,
  IPlayerTeamHistory,
} from "../interfaces/IPlayers";
import { IPlayerTransfers } from "@/interfaces/ITransfers";
export class PlayerService {
  public static async getPlayersById(playerId: number): Promise<IPlayer> {
    const response = await fetch(
      URLs.PLAYERS.ONE.replace("$id", playerId.toString())
    );
    return response.json() as Promise<IPlayer>;
  }

  public static async getPlayersByTeam(teamId: number): Promise<IPlayer[]> {
    const response = await fetch(
      URLs.PLAYERS.BY_TEAM.replace("$teamId", teamId.toString())
    );
    return response.json() as Promise<IPlayer[]>;
  }

  public static async getPlayerStatsByEdition(
    editionId: number
  ): Promise<IPlayerStats[]> {
    const response = await fetch(
      URLs.PLAYERS.STATS_BY_EDITION.replace("$editionId", editionId.toString())
    );
    return response.json() as Promise<IPlayerStats[]>;
  }

  public static async getPlayerStatsByTeam(
    teamId: number
  ): Promise<IPlayerStats[]> {
    const response = await fetch(
      URLs.PLAYERS.STATS_BY_TEAM.replace("$teamId", teamId.toString())
    );
    return response.json() as Promise<IPlayerStats[]>;
  }

  public static async getPlayerStatsByPlayer(
    playerId: number
  ): Promise<IPlayerStats[]> {
    try {
      const response = await fetch(
        URLs.PLAYERS.STATS_BY_PLAYER.replace("$playerId", playerId.toString())
      );
      return response.json() as Promise<IPlayerStats[]>;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static async getPlayerContracts(
    playerId: number
  ): Promise<IPlayerContracts[]> {
    try {
      const response = await fetch(
        URLs.PLAYERS.CONTRACT_BY_PLAYER.replace(
          "$playerId",
          playerId.toString()
        )
      );
      return response.json() as Promise<IPlayerContracts[]>;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static async getPlayerTransfers(
    playerId: number
  ): Promise<IPlayerTransfers[]> {
    try {
      const response = await fetch(
        URLs.PLAYERS.TRANSFER_BY_PLAYER.replace(
          "$playerId",
          playerId.toString()
        )
      );
      return response.json() as Promise<IPlayerTransfers[]>;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static async getPlayerTeamsHistory(
    playerId: number
  ): Promise<IPlayerTeamHistory[]> {
    try {
      const response = await fetch(
        URLs.PLAYERS.PLAYER_TEAM_HISTORY.replace(
          "$playerId",
          playerId.toString()
        )
      );
      return response.json() as Promise<IPlayerTeamHistory[]>;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
