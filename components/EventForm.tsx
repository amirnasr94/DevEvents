"use client";

import Image from "next/image";
import InputGroup from "./InputGroup";
import { useRef, useState, type SyntheticEvent } from "react";
import SelectGroup from "./SelectGroup";
import FileInput from "./FileInput";
import Textarea from "./Textarea";
import {
  CreateEventForm,
  validateCreateEventForm,
} from "@/validation/validateCreateEventForm";
import { treeifyError } from "zod";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function EventForm() {
  const [errors, setErrors] = useState<{
    [k in keyof CreateEventForm]?: string;
  }>({});

  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmitForm(data: FormData) {
    try {
      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      formRef?.current?.reset();
    } catch (error) {
      console.log(error);
    }
  }

  function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const formData = new FormData(form);
    const tags =
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [];

    const agenda =
      formData
        .get("agenda")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [];

    const validationForm = validateCreateEventForm.safeParse({
      ...Object.fromEntries(formData.entries()),
      tags,
      agenda,
    });

    if (validationForm.success) {
      handleSubmitForm(formData);
    } else {
      const tree = treeifyError(validationForm.error);
      const errors = Object.fromEntries(
        Object.entries(tree.properties ?? {}).map(([key, value]) => [
          key,
          value?.errors[0],
        ]),
      );
      setErrors(errors);
    }
  }

  return (
    <form className="space-y-5" onSubmit={submit} ref={formRef}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <InputGroup
          label="Event Title"
          name="title"
          placeholder="Enter event title"
          error={errors.title}
        />
        <DateInput label="Event Date" error={errors.date} />
        <TimeInput
          label="Event Time"
          name="time"
          placeholder="Select start time"
          endComponent={
            <Image
              src="/assets/icons/clock.svg"
              alt=""
              width={20}
              height={20}
            />
          }
          error={errors.time}
        />
        <InputGroup
          label="Event Venue"
          name="venue"
          placeholder="Enter venue or online link"
          endComponent={
            <Image src="/assets/icons/pin.svg" alt="" width={20} height={20} />
          }
          error={errors.venue}
        />

        <SelectGroup
          label="Event Type"
          name="mode"
          placeholder="Select mode"
          options={[
            { label: "Online", value: "online" },
            { label: "Offline", value: "offline" },
            { label: "Hybrid", value: "hybrid" },
          ]}
          error={errors.mode}
        />
        <InputGroup
          label="Event Audience"
          name="audience"
          placeholder="e.g: Developers, DevOps engineers..."
          endComponent={
            <Image
              src="/assets/icons/audience.svg"
              alt=""
              width={20}
              height={20}
            />
          }
          error={errors.audience}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FileInput
          label="Event image / banner"
          name="image"
          error={errors.image}
        />
        <InputGroup
          label="Tags"
          id="tags"
          name="tags"
          placeholder="e.g: react, next, js"
          error={errors.tags}
        />
      </div>

      <Textarea
        label="Event Agenda"
        name="agenda"
        placeholder="seprated itmes with ' , ' e.g: 09:30 AM – 10:30 AM | Opening Keynote: The Future of AI & Open Source,"
        rows={6}
        error={errors.agenda}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Textarea
          label="Event Description"
          name="description"
          placeholder="Briefly describe the event"
          rows={6}
          error={errors.description}
        />
        <Textarea
          label="Event Overview"
          name="overview"
          placeholder="describe the event"
          rows={6}
          error={errors.overview}
        />
      </div>

      <Textarea
        label="Event Organizer"
        name="organizer"
        placeholder="About the Organizer"
        rows={6}
        error={errors.organizer}
      />
      <button
        className="bg-primary text-dark-200 w-full text-center py-3 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
