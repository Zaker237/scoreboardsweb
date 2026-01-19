"use client"

import React from "react";

interface CenteredMessageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const CenteredMessage: React.FC<CenteredMessageProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="flex w-full h-full min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center text-center gap-3 max-w-md">
        {icon && <div className="text-5xl text-gray-400">{icon}</div>}

        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {description && <p className="text-sm text-gray-500">{description}</p>}

        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
};
