import EventBook from "@/components/EventBook";
import Image from "next/image";
import { notFound } from "next/navigation";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  lable,
}: {
  icon: string;
  alt: string;
  lable: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{lable}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {tags.map((tag) => {
        return (
          <div key={tag} className="pill">
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export async function generateMetadata({ params }: RouteParams) {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await response.json();

  return {
    title: event?.title,
    description: event?.description,
  };
}

export default async function page({ params }: RouteParams) {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await response.json();

  if (!event) {
    return notFound();
  }

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            className="banner"
            src={event.image}
            alt={event.title}
            width={800}
            height={800}
          />
          <section className="flex-col gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex-col gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/assets/icons/calendar.svg"
              alt="calendar"
              lable={event.date}
            />
            <EventDetailItem
              icon="/assets/icons/clock.svg"
              alt="clock"
              lable={event.time}
            />
            <EventDetailItem
              icon="/assets/icons/pin.svg"
              alt="pin"
              lable={event.location}
            />
            <EventDetailItem
              icon="/assets/icons/mode.svg"
              alt="mode"
              lable={event.mode}
            />
            <EventDetailItem
              icon="/assets/icons/audience.svg"
              alt="audience"
              lable={event.audience}
            />
          </section>
          <EventAgenda agendaItems={JSON.parse(event.agenda[0])} />
          <section className="flex flex-col gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>
          <EventTags tags={JSON.parse(event.tags[0])} />
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {true ? (
              <p className="text-sm">
                Join 10 pepole who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <EventBook />
          </div>
        </aside>
      </div>
    </section>
  );
}
