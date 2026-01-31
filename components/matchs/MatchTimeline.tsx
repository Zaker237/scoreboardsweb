"use client";

import { TimelineItem } from "./TimelineItem";
import { ITimelineEvent } from "@/interfaces/ITimelineEvent";
import { TimelineEventEnum } from "@/enums/timeline";
import { ShootoutCompactItem } from "./TimelineItem";
import { sortByMatchTime } from "@/lib/utils";

interface IMatchTimelineProps {
  events: ITimelineEvent[];
}

export const MatchTimeline: React.FC<IMatchTimelineProps> = ({ events }) => {
  if (!events.length)
    return <p className="text-center py-10">Waiting for events...</p>;

  const regularEvents = events.filter(
    (e) => e.type !== TimelineEventEnum.PENALTY_SHOOTOUT,
  );
  const shootoutEvents = events.filter(
    (e) => e.type === TimelineEventEnum.PENALTY_SHOOTOUT,
  );

  const shootoutRounds = Array.from(
    new Set(shootoutEvents.map((e) => e.shootout_order)),
  ).sort((a, b) => a! - b!);

  return (
    <div className="relative py-8 w-full max-w-2xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-slate-200" />

      <div className="space-y-6">
        {regularEvents.sort(sortByMatchTime).map((event) => (
          <TimelineItem key={`${event.type}-${event.id}`} event={event} />
        ))}
      </div>

      {shootoutRounds.length > 0 && (
        <div className="mt-12 space-y-4">
          <h3 className="text-center font-bold text-sm uppercase tracking-widest text-slate-400 mb-8">
            Penalty Shootout
          </h3>
          {shootoutRounds.map((round) => {
            const homeShot = shootoutEvents.find(
              (e) => e.shootout_order === round && e.is_home,
            );
            const awayShot = shootoutEvents.find(
              (e) => e.shootout_order === round && !e.is_home,
            );

            return (
              <div
                key={`round-${round}`}
                className="flex items-center justify-between relative"
              >
                <div className="flex-1 text-right pr-6">
                  {homeShot && <ShootoutCompactItem event={homeShot} />}
                </div>

                <div className="z-10 bg-white px-2 text-[10px] font-bold text-slate-400">
                  {round}
                </div>

                <div className="flex-1 text-left pl-6">
                  {awayShot && <ShootoutCompactItem event={awayShot} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
