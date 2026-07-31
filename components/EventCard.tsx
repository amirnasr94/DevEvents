import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  slug: string;
  venue: string;
  date: string;
  time: string;
};

export default function EventCard({
  title,
  image,
  slug,
  venue,
  date,
  time,
}: Props) {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        className="poster"
        width={410}
        height={300}
        objectFit="cover"
      />
      <div className="flex gap-2">
        <Image
          src="/assets/icons/pin.svg"
          alt="location"
          width={14}
          height={14}
        />
        <p>{venue}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        |
        <div>
          <Image
            src="/assets/icons/clock.svg"
            alt="clock"
            width={14}
            height={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}
