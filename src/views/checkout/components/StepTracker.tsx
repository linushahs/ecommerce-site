import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

const StepTracker = ({ current }: { current: number }) => {
  return (
    <div className="relative flex justify-center mt-[var(--navbar-height)] mb-12 z-10 w-1/2 mx-auto">
      <ul className="w-full flex justify-between items-center">
        {[1, 2, 3].map((step) => (
          <li
            key={step}
            className={twMerge(
              "flex flex-col items-center",
              current === step
                ? "[&>.step]:bg-black [&>.step]:text-white"
                : step < current || step > current
                ? "[&>.step]:bg-gray-200 [&>.step]:text-gray-400 [&>.subtitle]:text-gray-700"
                : ""
            )}
          >
            <div className="step rounded-full w-10 h-10 flex justify-center items-center font-medium">
              {step < current ? <CheckCircleIcon className="w-7 h-7 " /> : step}
            </div>
            <h6 className="subtitle  mt-2 mb-0">
              {step === 1 && "Order Summary"}
              {step === 2 && "Shipping Details"}
              {step === 3 && "Payment"}
            </h6>
          </li>
        ))}
        <div className="absolute left-1/2 -translate-x-1/2 top-[30%] w-[85%] h-[2px] bg-gray-200 -z-20"></div>
      </ul>
    </div>
  );
};

export default StepTracker;
