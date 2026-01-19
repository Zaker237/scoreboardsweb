"use client";

import React, { useContext, useEffect, useState } from "react";
import { dateActions } from "@/constants/actions";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateContext } from "@/contexts/DateContext";

const generateDateRange = (centerDate: Date, range: number): Date[] => {
  const dates: Date[] = [];
  for (let i = -range; i <= range; i++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const isSameDay = (d1: Date, d2: Date): boolean =>
  d1.toDateString() === d2.toDateString();

type Breakpoint = "small" | "mobile" | "tablet" | "desktop";

const useBreakpoint = (): Breakpoint | null => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 480) setBreakpoint("small");
      else if (width < 640) setBreakpoint("mobile");
      else if (width < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
};

export const DateNavigator: React.FC = () => {
  const { dispatch, state } = useContext(DateContext);
  const breakpoint = useBreakpoint();

  // Prevent hydration mismatch
  if (!breakpoint) return null;

  const setDate = (date: Date | undefined) => {
    if (date) {
      dispatch({ type: dateActions.DATE_CHANGED, payload: date });
    }
  };

  const handlePrevious = () => {
    const newDate = new Date(state.date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(state.date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const ranges: Record<Breakpoint, number> = {
    small: 2, // 5 days
    mobile: 3, // 7 days
    tablet: 4, // 9 days
    desktop: 5, // 11 days
  };

  const dateButtons = generateDateRange(state.date, ranges[breakpoint]);

  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      <button onClick={handlePrevious} aria-label="Previous day">
        <ChevronLeft />
      </button>

      {dateButtons.map((date) => {
        const selected = isSameDay(date, state.date);
        const key = date.toISOString().split("T")[0];

        return (
          <button
            key={key}
            onClick={() => setDate(date)}
            title={date.toDateString()}
            className={`text-xs px-1 py-2 min-w-[40px] rounded-lg border transition-colors duration-200
              ${
                selected
                  ? "bg-primary text-white font-extrabold border-2 border-primary"
                  : "bg-white text-black border-gray-300 hover:bg-blue-100"
              }`}
          >
            {formatDate(date)}
          </button>
        );
      })}

      <button onClick={handleNext} aria-label="Next day">
        <ChevronRight />
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className="ml-2 p-2 rounded-md border border-gray-300 hover:bg-gray-100"
            aria-label="Pick a date"
          >
            <CalendarIcon className="h-4 w-4" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={state.date}
            onSelect={setDate}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
