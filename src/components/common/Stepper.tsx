import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

const Stepper = ({ current }: { current: number }) => {
  return (
    <div className="relative flex justify-center mt-[var(--navbar-height)] top-4 mb-8 z-10 w-1/2 mx-auto">
      <ul className="flex justify-between items-center">
        {[1, 2, 3].map((step) => (
          <li
            key={step}
            className={twMerge(
              "flex flex-col items-center mx-10",
              current === step
                ? "[&>.step]:bg-black [&>.step]:text-white"
                : step < current || step > current
                ? "[&>.step]:bg-gray-200 [&>.step]:text-gray-400 [&>.subtitle]:text-gray-700"
                : ""
            )}
          >
            <div className="step bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center font-medium">
              {step < current ? <CheckCircleIcon className="w-7 h-7 " /> : step}
            </div>
          </li>
        ))}
        <div className="absolute left-1/2 -translate-x-1/2 top-[40%] w-[30%] h-[2px] bg-gray-300 -z-20"></div>
      </ul>
    </div>
  );
};

export default Stepper;
