import { Fragment, useState, useEffect } from "react";
import { Row, Col, Button, ButtonGroup } from "reactstrap";
import classnames from "classnames";
import SimpleCalendar from "../components/CalendarPage/Calendar";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSchedules,
  setRole,
  addSchedule,
  updateSchedule,
} from "../redux/CalendarSlice";

import "@styles/react/apps/app-calendar.scss";
import AddEventSidebar from "../components/CalendarPage/AddEventSidebar";

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.appCalendar);

  const [calendarApi, setCalendarApi] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // حالت باز بودن مدال و رویداد انتخاب شده
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // باز و بسته کردن مدال
  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) setSelectedEvent(null); // وقتی مدال بسته شد، رویداد انتخابی رو پاک کن
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(
        fetchSchedules({
          role: store.selectedRole,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })
      );
    }
  }, [store.selectedRole, dateRange, dispatch]);

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      setDateRange({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });
    }
  }, [store.selectedRole, dateRange]);

  const formatSchedulesForCalendar = (schedules) => {
    return schedules.map((item) => {
      const startDateTime = new Date(item.startDate);
      startDateTime.setHours(item.startTime || 0, 0, 0, 0);

      const endDateTime = new Date(item.endDate);
      endDateTime.setHours(item.endTime || 0, 0, 0, 0);

      return {
        id: item.id,
        title: `گروه دوره ${item.courseGroupId}`,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        allDay: false,
        extendedProps: {
          courseGroupId: item.courseGroupId,
          startTime: item.startTime,
          endTime: item.endTime,
          forming: item.forming,
          lockToRaise: item.lockToRaise,
          weekNumber: item.weekNumber,
          role: item.role, // اگر نقش داری
        },
      };
    });
  };

  const formattedEvents = formatSchedulesForCalendar(store.schedules || []);

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    console.log(event);
    // ساختار داده‌ای که فرم می‌خواد:
    const selectedEvent = {
      id: event.id,
      courseGroupId: event.extendedProps.courseGroupId || "",
      startDate: event.start ? event.start.toISOString().slice(0, 10) : "",
      endDate: event.end ? event.end.toISOString().slice(0, 10) : "",
      startTime: event.extendedProps.startTime || "",
      endTime: event.extendedProps.endTime || "",
      weekNumber: event.extendedProps.weekNumber || "",
      forming: event.extendedProps.forming || false,
      lockToRaise: event.extendedProps.lockToRaise || false,
    };

    // ارسال selectedEvent به state برای نمایش در فرم
    setSelectedEvent(selectedEvent);
    setModalOpen(true);
  };

  // افزودن رویداد جدید
  const addEvent = (eventData) => {
    dispatch(addSchedule(eventData));
  };

  // بروز رسانی رویداد
  const updateEvent = (eventData) => {
    dispatch(updateSchedule(eventData));
  };

  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border p-2">
        <Row className="mb-2">
          <Col>
            <ButtonGroup>
              <Button
                color="primary"
                outline={store.selectedRole !== "all"}
                onClick={() => dispatch(setRole("all"))}
                className={classnames({ active: store.selectedRole === "all" })}
              >
                دیدن همه
              </Button>
              <Button
                color="primary"
                outline={store.selectedRole !== "teacher"}
                onClick={() => dispatch(setRole("teacher"))}
                className={classnames({
                  active: store.selectedRole === "teacher",
                })}
              >
                اساتید
              </Button>
              <Button
                color="primary"
                outline={store.selectedRole !== "student"}
                onClick={() => dispatch(setRole("student"))}
                className={classnames({
                  active: store.selectedRole === "student",
                })}
              >
                دانشجویان
              </Button>
            </ButtonGroup>
          </Col>{" "}
          <Col className="text-end">
            <Button
              color="success"
              onClick={() => {
                setSelectedEvent(null); // فرم خالی
                setModalOpen(true);
              }}
            >
              + افزودن رویداد جدید
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <SimpleCalendar
              events={formattedEvents}
              setCalendarApi={setCalendarApi}
              onDateRangeChange={handleDateRangeChange}
              isRtl={true}
              onEventClick={handleEventClick} // اضافه کردن هندلر کلیک روی رویداد
            />
          </Col>
        </Row>

        {/* کامپوننت مدال اضافه/ویرایش رویداد */}
        <AddEventSidebar
          open={modalOpen}
          toggle={toggleModal}
          selectedEvent={selectedEvent || {}}
          addEvent={addEvent}
          updateEvent={updateEvent}
        />
      </div>
    </Fragment>
  );
};

export default CalendarComponent;
