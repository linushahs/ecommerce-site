import React from "react";
import { ShippingTotalProps } from "../interface";
import { twMerge } from "tailwind-merge";

const ShippingTotal: React.FC<ShippingTotalProps> = ({ subtotal = 2000 }) => {
  return (
    <div className="flex justify-end my-0">
      <table>
        <tbody>
          {renderRow("International Shipping:", "$0.00")}
          {renderRow("Subtotal:", `$${subtotal.toFixed(2)}`)}
          {renderRow("Total:", `$${subtotal.toFixed(2)}`)}
        </tbody>
      </table>
    </div>
  );
};

const renderRow = (label: string, amount: string) => (
  <tr key={label}>
    <td>
      <span className="block m-0 pr-2 text-right">{label}</span>
    </td>
    <td>
      <h4
        className={twMerge(
          "my-2 mx-0 text-right text-gray-500 font-semibold",
          label.includes("Total") && "text-xl text-black"
        )}
      >
        {amount}
      </h4>
    </td>
  </tr>
);

export default ShippingTotal;
