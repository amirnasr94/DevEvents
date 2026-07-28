import { InputHTMLAttributes, ReactNode, useId } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  endComponent?: ReactNode;
  error?: string;
}

export default function InputGroup({
  id,
  label,
  endComponent,
  error,
  className,
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
          className={clsx(
            "h-10 w-full rounded-md border border-input-border bg-dark-200 px-3",
            endComponent && "pe-10",
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
