import React from "react";
import { TimelineEventEnum } from "@/enums/timeline";

// export type TimelineEventType = TimelineEventEnum.GOAL | TimelineEventEnum.CARD | TimelineEventEnum.SUBSTITUTION;

export interface ITimelineEvent {
  id: number;
  type: TimelineEventEnum;
  minute: number;
  stoppage_minute?: number | null;
  team: IMatchTeam;
  title: string;
  description: string;
	icon: string | React;
  is_penalty?: boolean;
  is_home?: boolean;
}
