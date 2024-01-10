"use client";

import React, { ReactElement, ReactNode, useState } from "react";
import { BasketContent, BasketToggle } from ".";
import Overlay from "../common/Overlay";
import { BasketToggleProps } from "./interface";

interface BasketProps {
  children: ReactNode;
}

const Basket: React.FC<BasketProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [toggle] = React.Children.toArray(children) as [
    ReactElement<BasketToggleProps>
  ];

  return (
    <div>
      <Overlay isOpen={isOpen} onClose={handleToggle} />

      <BasketToggle onToggle={handleToggle}>
        {toggle.props.children}
      </BasketToggle>
      <BasketContent isOpen={isOpen} onClose={handleToggle} />
    </div>
  );
};

export default Basket;
