import React from "react";
import { TimelineEventEnum } from "@/enums/timeline";

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
  is_missed?: boolean;
  shootout_order?: number;
}
