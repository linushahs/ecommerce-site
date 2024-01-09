import React, { useState, ReactNode, ReactElement } from "react";
import { BasketContentProps, BasketToggleProps } from "./interface";
import Overlay, { OverlayProps } from "../common/Overlay";
import { BasketContent, BasketToggle } from ".";

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

  console.log(isOpen);

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
