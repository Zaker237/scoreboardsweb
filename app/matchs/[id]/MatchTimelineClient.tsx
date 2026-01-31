"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  FaFutbol,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BsFillSquareFill } from "react-icons/bs";
import { MatchService } from "@/services/MatchService";
import { MatchTimeline } from "@/components/matchs/MatchTimeline";
import { ChampionshipList } from "@/components/championships/ChampionshipList";
import { IMatch } from "@/interfaces/IMatch";
import { ITimelineEvent } from "@/interfaces/ITimelineEvent";
import { MatchHeader } from "@/components/matchs/MatchHeader";
import { CenteredMessage } from "@/components/CenteredMessage";
import { TimelineEventEnum } from "@/enums/timeline";
import { GoalStatus } from "@/enums/goals";
import { GoalType } from "@/enums/goals";

interface IProps {
  id: string;
}

const sortByMatchTime = (a: ITimelineEvent, b: ITimelineEvent) => {
  const timeA = a.minute * 100 + (a.stoppage_minute ?? 0);
  const timeB = b.minute * 100 + (b.stoppage_minute ?? 0);
  return timeA - timeB;
};

function buildEventsFromMatch(match: IMatch): ITimelineEvent[] {
  const events: ITimelineEvent[] = [];

  match.goals
    .filter((elem) => {
      return (
        elem.status == GoalStatus.VALID &&
        elem.goal_type != GoalType.PENALTY_SHOOTOUT
      );
    })
    .forEach((goal) => {
      events.push({
        id: goal.id,
        type: TimelineEventEnum.GOAL,
        minute: goal.minute ?? 0,
        stoppage_minute: goal.stoppage_minute ?? null,
        team: goal.team,
        icon: (
          <>
            <FaFutbol
              className={goal.is_csc ? "text-red-600" : "text-green-600"}
            />
          </>
        ),
        title: goal.scorer
          ? `${goal.scorer.firstname} ${goal.scorer.lastname}`
          : "Unknown scorer",
        description: goal.is_csc
          ? `Own goal`
          : goal.assister
            ? `(${goal.assister.firstname} ${goal.assister.lastname})`
            : "",
        is_penalty: goal.is_penalty,
        is_home:
          (goal.team.id === match.home_team.id && !goal.is_csc) ||
          (goal.team.id === match.away_team.id && goal.is_csc),
      });
    });

  // 2. MISSED goal
  match.goals
    .filter((elem) => {
      return (
        elem.status == (GoalStatus.CANCELLED || GoalStatus.MISSED) &&
        elem.goal_type != GoalType.PENALTY_SHOOTOUT
      );
    })
    .forEach((miss) => {
      events.push({
        id: miss.id,
        type: TimelineEventEnum.GOAL, // Keep as Goal type for UI grouping or use a specific MISSED type
        minute: miss.minute ?? 0,
        stoppage_minute: miss.stoppage_minute ?? null,
        team: miss.team,
        is_missed: true,
        icon: <FaTimesCircle className="text-gray-400" />,
        title: miss.scorer
          ? `${miss.scorer.firstname} ${miss.scorer.lastname}`
          : "Unknown scorer",
        description: "Missed Penalty",
        is_home: miss.team.id === match.home_team.id,
      });
    });

  match.goals
    .filter((elem) => {
      return elem.goal_type == GoalType.PENALTY_SHOOTOUT;
    })
    .forEach((attempt, index) => {
      events.push({
        id: attempt.id,
        type: TimelineEventEnum.PENALTY_SHOOTOUT,
        minute: 121,
        shootout_order: attempt.shootout_order || index + 1, // Used for side-by-side alignment
        team: attempt.team,
        is_missed: attempt.status != GoalStatus.VALID,
        icon:
          attempt.status != GoalStatus.VALID ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          ),
        title: attempt.scorer
          ? `${attempt.scorer.firstname} ${attempt.scorer.lastname}`
          : "Unknown scorer",
        description: "",
        is_home: attempt.team.id === match.home_team.id,
      });
    });

  match.cards.forEach((card) => {
    events.push({
      id: card.id,
      type: TimelineEventEnum.CARD,
      minute: card.minute ?? 0,
      stoppage_minute: card.stoppage_minute ?? null,
      team: card.team,
      icon:
        card.card_type == "red" ? (
          <BsFillSquareFill className="text-red-600" />
        ) : (
          <BsFillSquareFill className="text-yellow-400" />
        ),
      title: card.player
        ? `${card.player.firstname} ${card.player.lastname}`
        : "Unknown player",
      description: "",
      is_home: card.team.id === match.home_team.id,
    });
  });

  match.substitutions.forEach((sub) => {
    events.push({
      id: sub.id,
      type: TimelineEventEnum.SUBSTITUTION,
      minute: sub.minute ?? 0,
      stoppage_minute: null,
      team: sub.team,
      icon: <FaExchangeAlt className="text-blue-600" />,
      title: `${sub.player_out.firstname} → ${sub.player_in.firstname}`,
      description: "",
      is_home: sub.team.id === match.home_team.id,
    });
  });

  return events.sort(sortByMatchTime);
}

export default function MatchTimelineClient({ id }: IProps) {
  const router = useRouter();
  const [match, setMatch] = useState<IMatch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchEvents, setMatchEvents] = useState<ITimelineEvent[]>([]);

  useEffect(() => {
    const matchId = Number(id);

    const loadMatch = async () => {
      setIsLoading(true);
      try {
        const data = await MatchService.getMatchById(matchId);
        setMatch(data);
        setMatchEvents(buildEventsFromMatch(data));
      } catch {
        setMatch(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatch();
  }, [id]);

  if (isLoading) {
    return (
      <CenteredMessage
        title="Loading match..."
        description="Please wait while we fetch match details."
      />
    );
  }

  if (!match) {
    return (
      <CenteredMessage
        title="Match not found"
        description="The match you are looking for does not exist."
      />
    );
  }

  return (
    <div className="flex w-full p-4 gap-4">
      <div className="hidden lg:flex lg:w-1/4">
        <ChampionshipList />
      </div>

      <div className="w-full lg:w-2/4 space-y-4 mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={16} />
          Back to match
        </button>
        <MatchHeader match={match} />
        <MatchTimeline events={matchEvents} />
      </div>
    </div>
  );
}
