import React, { ReactNode } from "react";

interface BadgeProps {
  count: number;
  children: ReactNode | ReactNode[];
}

const Badge: React.FC<BadgeProps> = ({ count, children }) => (
  <div className="relative">
    {children}
    {count >= 1 && (
      <span className="absolute -top-2.5 -right-2.5 w-[18px] h-[18px] bg-red-500 rounded-full flex justify-center items-center text-white text-xs font-bold">
        {count}
      </span>
    )}
  </div>
);

export default Badge;
