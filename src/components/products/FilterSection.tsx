import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import { OptionProps, SectionProps } from "./interface";

const FilterOption: React.FC<
  OptionProps & { id: string; optionIdx: number }
> = ({ id, value, label, checked, optionIdx }) => (
  <div key={value} className="flex items-center">
    <input
      id={`${id}-${optionIdx}`}
      name={`${id}[]`}
      defaultValue={value}
      type="checkbox"
      defaultChecked={checked}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    />
    <label
      htmlFor={`${id}-${optionIdx}`}
      className="ml-3 text-sm text-gray-600"
    >
      {label}
    </label>
  </div>
);

const FilterSection: React.FC<{ section: SectionProps }> = ({
  section: { id, name, options },
}) => (
  <Disclosure
    as="div"
    key={id}
    defaultOpen={id === "color"}
    className="border-t border-gray-200 py-6"
  >
    {({ open }: { open: boolean }) => (
      <>
        <h3 className="-mx-2 -my-3 flow-root">
          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">{name}</span>
            <span className="ml-6 flex items-center">
              {open ? (
                <MinusIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
          </Disclosure.Button>
        </h3>
        <Disclosure.Panel className="pt-6">
          <div className="space-y-4">
            {options.map((option, optionIdx) => (
              <FilterOption
                key={optionIdx}
                id={id}
                optionIdx={optionIdx}
                {...option}
              />
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default FilterSection;
