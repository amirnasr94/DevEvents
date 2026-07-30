"use client";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface Props {
  label: string;
  error?: string;
}

export default function DateInput({ label, error }: Props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="flex flex-col gap-y-1">
      <label>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        name="date"
        withPortal
        dateFormat="YYYY-MM-dd"
        showIcon
        icon={
          <Image
            src="/assets/icons/calendar.svg"
            alt=""
            width={30}
            height={30}
          />
        }
        calendarIconClassName="right-0 p-0 w-[20]! h-[20]!"
        className="px-3!"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
