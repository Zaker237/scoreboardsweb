"use client"

import { TimelineItem } from "./TimelineItem";
import { ITimelineEvent } from "@/interfaces/ITimelineEvent";

interface IMatchTimelineProps {
  events: ITimelineEvent[];
}

export const MatchTimeline: React.FC<IMatchTimelineProps> = (
  props: IMatchTimelineProps
) => {
  if (!props.events.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        Waiting for match events...
      </p>
    );
  }

  return (
    <div className="relative py-8">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />

      <div className="space-y-12">
        {props.events.map((event) => (
          <TimelineItem key={`${event.type}-${event.id}`} event={event} />
        ))}
      </div>
    </div>
  );
};
