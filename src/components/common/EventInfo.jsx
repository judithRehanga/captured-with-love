import "./EventInfo.css";

export default function EventInfo({
  title,
  date,
  location,
}) {
  return (
    <section className="event-info">

      <div className="event-card">

        <h3>{title}</h3>

        <p>{date}</p>

        <p>{location}</p>

      </div>

    </section>
  );
}