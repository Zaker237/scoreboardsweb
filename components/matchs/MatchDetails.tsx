import React from "react";
import { IMatch } from "@/interfaces/IMatch";

interface IMatchDetailsProps {
  match: IMatch;
}

export const MatchDetails: React.FC<IMatchDetailsProps> = ({ match }) => {
  return (
    <div className="flex flex-col w-full rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 w-full"></h2>
      <p className="text-lg mb-2">
        Date: {new Date(match.date).toLocaleDateString()}
      </p>
      <p className="text-lg mb-2">
        Time: {new Date(match.date).toLocaleTimeString()}
      </p>
      <p className="text-lg mb-2">Score:</p>
    </div>
  );
};
