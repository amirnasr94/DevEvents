import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export default function EmptyState({
  title = "No events found",
  description = "There aren't any events yet. Create your first event to get started.",
  buttonText = "Create Event",
  link = "/",
}: Partial<EmptyStateProps>) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 bg-dark-200 px-6 text-center mt-10">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <span className="text-3xl">📅</span>
      </div>

      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <p className="mt-3 max-w-md text-gray-400">{description}</p>

      <Link
        href={link}
        className="mt-8 rounded-md bg-primary px-5 py-2.5 font-medium text-black transition hover:bg-primary/90"
      >
        {buttonText}
      </Link>
    </div>
  );
}
