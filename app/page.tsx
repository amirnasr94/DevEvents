import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featur Events</h3>
        <ul className="events">
          {events.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              image={event.image}
              location={event.location}
              slug={event.slug}
              date={event.date}
              time={event.time}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
