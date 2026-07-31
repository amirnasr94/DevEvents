import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function page() {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  if (!events || !Array.isArray(events)) {
    return notFound();
  }

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-y-5 items-center justify-between">
        <h1>Event Managment</h1>
        <Link href={""}>
          <button className="bg-primary hover:bg-primary/90 max-lg:w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black">
            Add New Event
          </button>
        </Link>
      </div>
      <div className="w-full mt-9">
        <table className="table-auto min-w-full overflow-x-auto">
          <thead>
            <tr className="bg-dark-200 text-left">
              <th className="">Events</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booked spot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              return (
                <tr key={event.title}>
                  <td className="text-lg font-semibold border ">
                    <div className="flex gap-x-2 items-center">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={40}
                        height={40}
                      />
                      {event.title}
                    </div>
                  </td>
                  <td>{event.venue}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{400}</td>
                  <td>
                    <div className="flex gap-x-3">
                      <button className="text-primary text-base font-semibold">
                        Edit
                      </button>
                      <button className="text-white text-base font-semibold">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
