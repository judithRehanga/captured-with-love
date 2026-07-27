import Hero from "../../components/layout/Hero/Hero";
import "./EventPage.css";
import { useEffect } from "react";
import { useUpload } from "../../context/UploadContext";
import EventInfo from "../../components/common/EventInfo";
import UploadCard from "../../components/upload/UploadCard";

function EventPage({ event }) {

  const { setCurrentEvent } = useUpload();

  useEffect(() => {
    setCurrentEvent(event);
  }, [event]);


  return (
    <>
      <Hero event={event} />

      <EventInfo
        title={event.title}
        date={event.date}
        location={event.location}
      />

      <UploadCard event={event} />
    </>
  );
}

export default EventPage;
