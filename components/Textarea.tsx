import { TextareaHTMLAttributes, useId } from "react";
import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  id,
  label,
  error,
  className,
  rows = 5,
  ...props
}: Props) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={textareaId}>{label}</label>

      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-md border border-input-border bg-dark-200 p-2 text-input placeholder:text-placeholder resize-none focus:outline-none",
          error && "border-red-500",
          className,
        )}
        {...props}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
