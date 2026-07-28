"use client";

import { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export default function FileInput({ label, ...props }: Props) {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name);
  };

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <button
        type="button"
        className="border border-input-border bg-dark-200 rounded-md h-10 text-input px-2 w-full text-left"
        onClick={() => inputRef.current?.click()}
      >
        {fileName ?? "Upload image"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        className="hidden"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
