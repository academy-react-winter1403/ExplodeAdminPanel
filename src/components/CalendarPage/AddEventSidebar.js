import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  FormGroup,
} from "reactstrap";

const AddEventSidebar = ({
  open,
  toggle,
  addEvent,
  updateEvent,
  selectedEvent,
}) => {
  const [form, setForm] = useState({
    courseGroupId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    weekNumber: "",
    forming: false,
    lockToRaise: false,
  });

  useEffect(() => {
    if (selectedEvent && Object.keys(selectedEvent).length > 0) {
      const startDateStr =
        typeof selectedEvent.startDate === "string"
          ? selectedEvent.startDate
          : selectedEvent.startDate?.toISOString();

      const endDateStr =
        typeof selectedEvent.endDate === "string"
          ? selectedEvent.endDate
          : selectedEvent.endDate?.toISOString();
      console.log("selectedEvent", selectedEvent);
      setForm({
        courseGroupId: selectedEvent.courseGroupId || "",
        startDate: startDateStr?.slice(0, 10) || "",
        endDate: endDateStr?.slice(0, 10) || "",
        startTime: selectedEvent.startTime ?? "",
        endTime: selectedEvent.endTime ?? "",
        weekNumber: selectedEvent.weekNumber ?? "",
        forming: selectedEvent.forming ?? false,
        lockToRaise: selectedEvent.lockToRaise ?? false,
      });
    } else {
      // فرم خالی برای رویداد جدید
      setForm({
        courseGroupId: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        weekNumber: "",
        forming: false,
        lockToRaise: false,
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // فقط تاریخ بدون ساعت (yyyy-mm-dd)
    const startDateStr = form.startDate; // فرض می‌کنیم این قبلاً yyyy-mm-dd هست
    const endDateStr = form.endDate;

    const eventData = {
      ...form,
      id: selectedEvent?.id || Date.now().toString(),
      startDate: startDateStr + "T00:00:00", // اضافه کردن ساعت 00:00:00 (بدون offset)
      endDate: endDateStr + "T00:00:00",
      startTime: Number(form.startTime),
      endTime: Number(form.endTime),
      courseGroupId: Number(form.courseGroupId),
      weekNumber: Number(form.weekNumber),
      forming: form.forming,
      lockToRaise: form.lockToRaise,
    };

    if (selectedEvent && selectedEvent.id) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }

    toggle();
  };

  const handleDelete = () => {
    if (selectedEvent && selectedEvent.id) {
      updateEvent({ ...selectedEvent, deleted: true });
      toggle();
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle} className="sidebar-lg">
      <ModalHeader toggle={toggle}>
        {selectedEvent && selectedEvent.id ? "ویرایش برنامه" : "افزودن برنامه"}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>کد گروه دوره</Label>
            <Input
              type="number"
              name="courseGroupId"
              value={form.courseGroupId}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>تاریخ شروع</Label>
            <Input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>تاریخ پایان</Label>
            <Input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>ساعت شروع</Label>
            <Input
              type="number"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              min="0"
              max="23"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>ساعت پایان</Label>
            <Input
              type="number"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              min="0"
              max="23"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>شماره هفته</Label>
            <Input
              type="number"
              name="weekNumber"
              value={form.weekNumber}
              onChange={handleChange}
              min="1"
              required
            />
          </FormGroup>

          <FormGroup check className="mb-2">
            <Label check>
              <Input
                type="checkbox"
                name="forming"
                checked={form.forming}
                onChange={handleChange}
              />{" "}
              تشکیل شده
            </Label>
          </FormGroup>

          <FormGroup check className="mb-3">
            <Label check>
              <Input
                type="checkbox"
                name="lockToRaise"
                checked={form.lockToRaise}
                onChange={handleChange}
              />{" "}
              قفل برای ارتقا
            </Label>
          </FormGroup>

          <Button color="primary" type="submit" className="me-2">
            {selectedEvent?.id ? "بروزرسانی" : "ثبت"}
          </Button>
          {selectedEvent?.id && (
            <Button color="danger" onClick={handleDelete} className="me-2">
              حذف
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            انصراف
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddEventSidebar;
