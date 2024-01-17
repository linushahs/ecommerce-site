"use client";

import React, { ReactElement, ReactNode, useState } from "react";

interface TabProps {
  "data-label": string;
  "data-index": number;
  children: ReactNode;
}

interface UserTabProps {
  children: ReactElement<TabProps>[] | ReactElement<TabProps>;
}

const UserTab: React.FC<UserTabProps> = ({ children }: UserTabProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onClickTabItem = (index: number): void => setActiveTab(index);

  return (
    <div className="user-tab mt-[var(--navbar-height)] mb-12 rounded-md overflow-hidden">
      <div className="user-tab-nav">
        <ul className="user-tab-menu">
          {React.Children.map(children, (child, index) => {
            const { "data-label": label, "data-index": tabIndex } =
              child.props as TabProps;

            return (
              <li
                className={`user-tab-item ${
                  tabIndex === activeTab ? "user-tab-active" : ""
                }`}
                key={label}
                role="presentation"
                onClick={() => onClickTabItem(index)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="user-tab-content">
        {React.Children.map(children, (child) => {
          if ((child.props as TabProps)["data-index"] !== activeTab)
            return null;

          return child;
        })}
      </div>
    </div>
  );
};

export default UserTab;
