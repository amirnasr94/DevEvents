import { InputHTMLAttributes, ReactNode, useId } from "react";
import clsx from "clsx";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  endComponent?: ReactNode;
}

export default function TimeInput({
  id,
  label,
  error,
  className,
  endComponent,
  ...props
}: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId}>{label}</label>
      <div className="relative">
        <input
          id={inputId}
          type="time"
          className={clsx(
            "h-10 w-full rounded-md border border-input-border bg-dark-200 px-3 text-input",
            error && "border-red-500",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {endComponent && (
          <div className="pointer-events-none absolute inset-y-0 inset-e-3 flex items-center">
            {endComponent}
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
