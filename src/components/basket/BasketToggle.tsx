"use client";

import React from "react";
import { Button } from "../common";
import { BasketToggleProps } from "./interface";

const BasketToggle: React.FC<BasketToggleProps> = ({ onToggle, children }) => (
  <Button type="button" variant="link" onClick={onToggle}>
    {children}
  </Button>
);

export default BasketToggle;
