import { Helmet } from "react-helmet-async";
import CalendarBooking from "@/components/ui/calendar-booking";

export default function Booking() {
  return (
    <>
      <Helmet>
        <title>Book Consultation - TechVantage Solutions</title>
        <meta 
          name="description" 
          content="Schedule a free consultation with our IT experts. Book your 30-minute session to discuss your web development, cloud solutions, and digital transformation needs." 
        />
        <meta name="keywords" content="consultation booking, IT consultation, web development consultation, free consultation, schedule meeting" />
      </Helmet>

      <div className="py-20">
        <CalendarBooking />
      </div>
    </>
  );
}