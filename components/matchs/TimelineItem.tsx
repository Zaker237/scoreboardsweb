"use client"

import { ITimelineEvent } from "@/interfaces/ITimelineEvent";
import { TimelineEventEnum } from "@/enums/timeline";

interface ItemProps {
  event: ITimelineEvent;
}

export const TimelineItem: React.FC<ItemProps> = ({ event }) => {
  const isHome = event.is_home;
  return (
    <div
      className={`flex items-center w-full ${
        isHome ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`w-[45%] ${isHome ? "text-right pr-4" : "text-left pl-4"}`}
      >
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 inline-block max-w-full">
          <div className="flex items-center gap-2 mb-1 justify-inherit">
            <span className="text-sm font-bold text-gray-900">
              {event.icon}
            </span>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 rounded">
              {event.minute}
              {event.stoppage_minute ? `+${event.stoppage_minute}` : ""}'
            </span>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="text-xs font-medium text-gray-700 leading-tight">
              {event.title}
            </p>
            {event.description && (
              <span className="text-[10px] font-normal text-gray-500 leading-tight">
                {event.description}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 w-[10%] flex justify-center">
        <div
          className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${
            event.type === TimelineEventEnum.GOAL
              ? "bg-green-500"
              : event.type === TimelineEventEnum.CARD
              ? "bg-yellow-400"
              : "bg-blue-400"
          }`}
        />
      </div>

      <div className="w-[45%]" />
    </div>
  );
};
