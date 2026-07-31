"use client";

import { createBooking } from "@/lib/actions/booking.action";
import React, { useState } from "react";

type Params = {
  eventId: string;
  slug: string;
};

export default function EventBook({ eventId, slug }: Params) {
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    console.log({
      eventId,
      slug,
      email,
    });

    const { success } = await createBooking({ eventId, slug, email });

    if (success) setSubmited(true);
    else console.error("Creation Booking Failed!");
  }

  return (
    <div id="book-event">
      {submited ? (
        <p className="text-sm">Thenk you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="button-submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
