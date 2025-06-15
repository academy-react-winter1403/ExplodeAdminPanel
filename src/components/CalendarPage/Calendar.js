import { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import { Card, CardBody } from "reactstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

// استایل‌های ضروری
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

const SimpleCalendar = ({ events, isRtl }) => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);

  useEffect(() => {
    if (calendarRef.current && !calendarInstance.current) {
      calendarInstance.current = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: events,
        direction: isRtl ? "rtl" : "ltr",
        headerToolbar: {
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        },
      });
      calendarInstance.current.render();
    }

    return () => {
      if (calendarInstance.current) {
        calendarInstance.current.destroy();
        calendarInstance.current = null;
      }
    };
  }, [events, isRtl]);

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <div ref={calendarRef}></div>
      </CardBody>
    </Card>
  );
};

export default SimpleCalendar;
