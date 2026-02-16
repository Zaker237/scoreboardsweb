"use client";

import { ITimelineEvent } from "@/interfaces/ITimelineEvent";
// import { TimelineEventEnum } from "@/enums/timeline";
import { cn } from "@/lib/utils";

interface ItemProps {
  event: ITimelineEvent;
}

export const TimelineItem: React.FC<ItemProps> = ({ event }) => {
  const isHome = event.is_home;
  return (
    <div
      className={cn(
        "flex items-center w-full",
        isHome ? "flex-row" : "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "w-1/2 px-4 flex items-center gap-3",
          isHome ? "flex-row-reverse text-right" : "flex-row text-left",
        )}
      >
        <span className="text-xl shrink-0 leading-none">{event.icon}</span>

        <div
          className={cn(
            "flex flex-col min-w-0",
            isHome ? "items-end" : "items-start",
          )}
        >
          <span className="font-bold text-sm leading-tight whitespace-nowrap">
            {event.title}
          </span>

          {event.description && (
            <span
              className={cn(
                "text-[10px] leading-tight text-slate-500/80 font-medium truncate w-full",
                "mt-0.5",
              )}
            >
              {event.description}
            </span>
          )}
        </div>
      </div>

      <div className="z-10 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full text-[10px] font-bold shrink-0">
        {event.minute}&apos;
      </div>

      <div className="w-1/2" />
    </div>
  );
};

export const ShootoutCompactItem: React.FC<{ event: ITimelineEvent }> = ({
  event,
}) => (
  <div
    className={cn(
      "flex items-center gap-2",
      event.is_home ? "justify-end" : "justify-start",
    )}
  >
    <span
      className={cn(
        "text-xs font-medium",
        event.is_missed ? "text-red-500 line-through" : "text-slate-900",
      )}
    >
      {event.title}
    </span>
    <span className={event.is_missed ? "opacity-50" : ""}>{event.icon}</span>
  </div>
);
