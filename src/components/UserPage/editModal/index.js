import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/appUsersSlice";
// ** کامپوننت‌های ری‌اکت‌استرپ
import {
  Row,
  Col,
  Form,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";

const EditModal = ({ setShow, show, selectedUser }) => {
  const dispatch = useDispatch();
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      userName: selectedUser.userName,
      lName: selectedUser.lName.split(" ")[1],
      fName: selectedUser.fName.split(" ")[0],
      gmail: selectedUser.gmail || "",
      phoneNumber: selectedUser.phoneNumber || "",
      nationalCode: selectedUser.nationalCode || "",
    },
  });
  // ** ارسال فرم
  const onSubmit = (data) => {
    // بررسی وجود مقادیر برای همه فیلدها
    const isValid = Object.values(data).every((field) => {
      // اگر فیلد boolean باشد (مثل فیلد active)، همیشه معتبر است
      if (typeof field === "boolean") return true;

      // اگر فیلد number باشد (مثل شماره تماس)، بررسی وجود داشته باشد
      if (typeof field === "number")
        return field !== null && field !== undefined;

      // برای رشته‌ها بررسی طول
      return field && field.toString().trim().length > 0;
    });

    if (isValid) {
      // ارسال فرم اگر همه فیلدها معتبر هستند
      setShow(false);
      // اینجا می‌توانید داده‌ها را به سرور ارسال کنید
      console.log("فرم ارسال شد:", data);
      dispatch(
        updateUser({
          id: selectedUser.id,
          userName: data.userName,
          fName: data.fName,
          lName: data.lName,
          gmail: data.gmail,
          phoneNumber: data.phoneNumber,
          nationalCode: data.nationalCode,
          birthDay: data.birthDay,
        })
      );
    } else {
      // تنظیم خطا برای فیلدهای نامعتبر
      Object.entries(data).forEach(([key, value]) => {
        if (
          (typeof value !== "boolean" && !value) ||
          (typeof value === "string" && value.trim().length === 0) ||
          value === null ||
          value === undefined
        ) {
          setError(key, {
            type: "manual",
            message: "این فیلد الزامی است",
          });
        }
      });
    }
  };

  return (
    <Modal
      isOpen={show}
      toggle={() => setShow(!show)}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={() => setShow(!show)}
      ></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات کاربر</h1>
          <p>به‌روزرسانی جزئیات کاربر نیازمند بررسی حریم خصوصی است.</p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <Label className="form-label" for="fName">
                نام
              </Label>
              <Controller
                control={control}
                name="fName"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="fName"
                    placeholder="جان"
                    invalid={errors.fName && true}
                  />
                )}
              />
            </Col>

            <Col md={6} xs={12}>
              <Label className="form-label" for="lName">
                نام خانوادگی
              </Label>
              <Controller
                control={control}
                name="lName"
                defaultValue={selectedUser.lName}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lName"
                    placeholder="دو"
                    invalid={errors.lName && true}
                  />
                )}
              />
            </Col>

            <Col xs={12}>
              <Label className="form-label" for="userName">
                نام کاربری
              </Label>
              <Controller
                control={control}
                name="userName"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="userName"
                    placeholder="john.doe.007"
                    invalid={errors.userName && true}
                  />
                )}
              />
            </Col>

            <Col md={6} xs={12}>
              <Label className="form-label" for="gmail">
                ایمیل
              </Label>
              <Controller
                control={control}
                name="gmail"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    id="gmail"
                    placeholder="example@domain.com"
                    invalid={errors.gmail && true}
                  />
                )}
              />
            </Col>

            <Col md={6} xs={12}>
              <Label className="form-label" for="phoneNumber">
                شماره تماس
              </Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="09121234567"
                    invalid={errors.phoneNumber && true}
                  />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="birthDay">
                تاریخ تولد
              </Label>
              <Controller
                control={control}
                name="birthDay"
                defaultValue={selectedUser.birthDay.slice(0, 10)}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    id="birthDay"
                    placeholder="2023-01-01"
                    invalid={errors.birthDay && true}
                  />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="nationalCode">
                کد ملی
              </Label>
              <Controller
                control={control}
                name="nationalCode"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nationalCode"
                    placeholder="1234567890"
                    invalid={errors.nationalCode && true}
                  />
                )}
              />
            </Col>

            <Col xs={12} className="text-center mt-2 pt-50">
              <Button
                type="submit"
                className="me-1"
                color="primary"
                disabled={!isDirty}
              >
                تایید
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => {
                  reset();
                  setShow(false);
                }}
              >
                انصراف
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};
export default EditModal;
