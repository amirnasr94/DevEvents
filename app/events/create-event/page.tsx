import EventForm from "@/components/EventForm";


export default function page() {
  return (
    <section>
      <h1 className="text-center">Create an Event</h1>
      <div className="p-4 bg-dark-100 border border-dark-200 mt-9 w-full lg:w-6/12 mx-auto rounded-md">
        <EventForm />
      </div>
    </section>
  );
}
