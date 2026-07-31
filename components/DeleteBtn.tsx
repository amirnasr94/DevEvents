"use client";

import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DeleteBtn({ slug }: { slug: string }) {
  const router = useRouter();
  async function handleDeleteEvent() {
    if (!slug) return;
    const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error();
    }

    router.refresh();
  }
  return (
    <button
      type="button"
      className="text-white text-base font-semibold cursor-pointer"
      onClick={handleDeleteEvent}
    >
      Delete
    </button>
  );
}
