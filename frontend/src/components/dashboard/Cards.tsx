import React from "react";
import clsx from "clsx";

interface CardsProps {
  title: string;
  value: number;
  bgColor?: string;
}

const Cards: React.FC<CardsProps> = ({ title, value = 0, bgColor }) => {

  return (
    <div className={clsx(
      "rounded-lg overflow-hidden shadow-lg text-white text-balance text-left ",
      bgColor && `${bgColor}`
    )}>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-semibold">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default Cards;
