import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { dateActions } from "@/constants/actions";
import { Calendar } from "@/components/ui/calendar";
import { DateContext } from "@/contexts/DateContext";

export const DateComponent: React.FC = () => {
  const { dispatch, state } = useContext(DateContext);

  const setDate = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    dispatch({ type: dateActions.DATE_CHANGED, payload: date });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex items-center justify-center">
        <Calendar
          mode="single"
          selected={state.date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};
