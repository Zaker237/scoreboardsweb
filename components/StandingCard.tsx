import React from "react";
import { IStanding } from "../interfaces/IStanding";
import Image from "next/image";

interface IStandingCardProps {
  standing: IStanding;
  index: number;
}

export const StandingCard: React.FC<IStandingCardProps> = (
  props: IStandingCardProps,
) => {
  return (
    <tr className="border-b">
      <td className="p-2">{props.index + 1}</td>
      <td className="p-2">
        {props.standing.participation.team.logo && (
          <Image
            src={props.standing.participation.team.logo}
            alt={props.standing.participation.team.name}
            className="w-6 h-6 mr-2 inline-block"
            width={64}
            height={64}
          />
        )}
        {props.standing.participation.team.name}
      </td>
      <td className="p-2 text-center">{props.standing.matches_played}</td>
      <td className="p-2 text-center">{props.standing.wins}</td>
      <td className="p-2 text-center">{props.standing.draws}</td>
      <td className="p-2 text-center">{props.standing.losses}</td>
      <td className="p-2 text-center">{props.standing.goals_for}</td>
      <td className="p-2 text-center">{props.standing.goals_against}</td>
      <td className="p-2 text-center">
        {props.standing.goals_for - props.standing.goals_against}
      </td>
      <td className="p-2 text-center font-bold">{props.standing.points}</td>
    </tr>
  );
};
