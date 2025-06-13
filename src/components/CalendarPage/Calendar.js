import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardBody } from "reactstrap";

const Calendar = ({
  events,
  isRtl = false,
  setCalendarApi,
  onDateRangeChange,
  onEventClick, // این prop رو می‌گیریم
}) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current && setCalendarApi) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [setCalendarApi]);

  const handleDatesSet = (arg) => {
    const startDate = arg.start.toISOString();
    const adjustedEnd = new Date(arg.end.getTime() - 1 * 24 * 60 * 60 * 1000);
    const endDate = adjustedEnd.toISOString();

    if (onDateRangeChange) {
      onDateRangeChange({ startDate, endDate });
    }
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          editable={false}
          dayMaxEvents={true}
          navLinks={true}
          direction={isRtl ? "rtl" : "ltr"}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          datesSet={handleDatesSet}
          eventClick={onEventClick} // وصل کردن هندلر کلیک رویداد
        />
      </CardBody>
    </Card>
  );
};

export default Calendar;
