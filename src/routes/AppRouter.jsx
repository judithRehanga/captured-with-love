import { BrowserRouter, Routes, Route } from "react-router-dom";

import EventPage from "../pages/EventPage/EventPage";
import { events } from "../data/events";
import UploadPage from "../pages/UploadPage/UploadPage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import ThankYouPage from "../pages/ThankYouPage/ThankYouPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventPage event={events.wedding} />} />

        <Route path="/wedding" element={<EventPage event={events.wedding} />} />

        <Route
          path="/engagement"
          element={<EventPage event={events.engagement} />}
        />

        <Route
          path="/bachelorette"
          element={<EventPage event={events.bachelorette} />}
        />

        <Route
          path="/bridal-shower"
          element={<EventPage event={events.bridalShower} />}
        />

        <Route path="/upload" element={<UploadPage />} />

        <Route path="/review" element={<ReviewPage />} />

        <Route path="/thank-you" element={<ThankYouPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
