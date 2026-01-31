if (!process.env.NEXT_PUBLIC_API_HOST) {
  throw new Error("NEXT_PUBLIC_API_HOST is missing");
}

export const HOST = process.env.NEXT_PUBLIC_API_HOST;
export let PROTOCOLE: string =
  process.env.NODE_ENV === "production" ? "https" : "http";

const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "v1";

export const BASE_URL = `${PROTOCOLE}://${HOST}/${API_VERSION}`;

export const WS_BASE_URL =
  process.env.NODE_ENV === "production" ? `wss://${HOST}` : `ws://${HOST}`;

export const URLs = {
  CHAMPIONSHIPS: {
    ALL: `${BASE_URL}/championships/`,
    ONE: `${BASE_URL}/championships/$id/`,
  },
  EDITIONS: {
    ACTIVE: `${BASE_URL}/championships/editions/`,
    RULES: `${BASE_URL}/edition/$editionId/rules/`,
  },
  STANDINGS: {
    ALL: `${BASE_URL}/standings/`,
    CHAMPIONSHIP: `${BASE_URL}/edition/$editionId/standings/`,
  },
  TEAMS: {
    ALL: `${BASE_URL}/teams/`,
    BY_ID: `${BASE_URL}/teams/$id/`,
    BY_EDITION: `${BASE_URL}/edition/$editionId/teams/`,
    BY_CHAMPIONSHIP_YEAR: `${BASE_URL}/championships/$championshipId/edition/$year/teams/`,
    STATS_BY_EDITION: `${BASE_URL}/teams/stats/edition/$editionId/`,
  },
  MATCHS: {
    ALL: `${BASE_URL}/matchs/`,
    BY_DAY: `${BASE_URL}/matchs/day/`,
    BY_ID: `${BASE_URL}/matchs/$id/`,
    UPCOMING: `${BASE_URL}/matchs/upcoming/`,
    BY_TEAM: `${BASE_URL}/matchs/team/$teamId/`,
    BY_CHAMPIONSHIP_EDITION: `${BASE_URL}/matchs/championship/$championshipId/edition/$editionId/`,
    BY_EDITION: `${BASE_URL}/matchs/edition/$editionId/`,
    APPEARANCE: `${BASE_URL}/appearances/match/$matchId/`,
    SUBTITUTIONS: `${BASE_URL}/matchs/$matchId/substitutions/`,
    LINEUPS: `${BASE_URL}/lineups/match/$matchId/`,
  },
  PLAYERS: {
    ALL: `${BASE_URL}/players/`,
    ONE: `${BASE_URL}/players/$id/`,
    BY_TEAM: `${BASE_URL}/teams/$teamId/players/`,
    STATS_BY_EDITION: `${BASE_URL}/players/stats/edition/$editionId/`,
    STATS_BY_TEAM: `${BASE_URL}/players/stats/team/$teamId/`,
    STATS_BY_PLAYER: `${BASE_URL}/players/stats/player/$playerId/`,
    CONTRACT_BY_PLAYER: `${BASE_URL}/contrats/player/$playerId/`,
    TRANSFER_BY_PLAYER: `${BASE_URL}/transfers/player/$playerId/`,
    PLAYER_TEAM_HISTORY: `${BASE_URL}/players/$playerId/teams-history/`,
  },
  DEVICES: {
    REGISTER: `${BASE_URL}/devices/`,
  },
  NOTIFICATIONS: {
    WEBSOCKET: `${WS_BASE_URL}/ws/notifications/$deviceId/`,
  },
};
