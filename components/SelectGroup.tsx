import { SelectHTMLAttributes, useId } from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string | number;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  placeholder?: string;
  error?: string;
}

export default function SelectGroup({
  label,
  options,
  placeholder,
  error,
  className,
  id,
  ...props
}: Props) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={selectId}
        className={clsx(
          "h-10 rounded-md border border-input-border bg-dark-200 px-2 text-input outline-none focus:border-primary",
          error && "border-red-500",
          className,
        )}
        {...props}
        defaultValue={placeholder && "null"}
      >
        {placeholder && (
          <option value="null" className="hidden">
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
