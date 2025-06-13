// ** ایمپورت‌های ری‌اکت
import { useState, Fragment } from "react";

// ** کامپوننت‌های ری‌اکت‌استرپ
import { Card, CardBody, Button, Badge, Input } from "reactstrap";

// ** کامپوننت‌های شخص ثالث
import Swal from "sweetalert2";

import { Check, Briefcase, X, Edit, User, Upload } from "react-feather";

import withReactContent from "sweetalert2-react-content";

// ** کامپوننت‌های سفارشی
import Avatar from "@components/avatar";

// ** استایل‌ها
import "@styles/react/libs/react-select/_react-select.scss";
import { formatDatePersian } from "../../../utility/Utils";

import EditModal from "../editModal";
import {
  addImageUser,
  getAccessToUser,
  reverseToActiveUser,
  setUserCurrentImage,
} from "../../../@core/services/Users";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/appUsersSlice";
// رنگ‌های نقش‌ها
const roleColors = {
  editor: "light-info",
  Administrator: "light-danger",
  Teacher: "light-warning",
  TournamentMentor: "light-success",
  Student: "light-primary",
};

// رنگ‌های وضعیت‌ها
const statusColors = {
  true: "light-success",
  pending: "light-warning",
  false: "light-secondary",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  // ** حالت‌ها
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // ** هوک فرم
  const dispatch = useDispatch();
  // ** رندر تصویر کاربر
  const renderUserImg = () => {
    console.log(selectedUser);
    const hasPicture =
      selectedUser?.currentPictureAddress?.length > 0 &&
      selectedUser?.currentPictureAddress !== "Not-set";

    return (
      <div className="position-relative d-flex justify-content-center align-items-center">
        {hasPicture ? (
          <img
            height="110"
            width="110"
            alt="تصویر کاربر"
            src={selectedUser.currentPictureAddress}
            className="img-fluid rounded mt-3 mb-2"
          />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center rounded mt-3 mb-2"
            style={{
              height: "110px",
              width: "110px",
              backgroundColor: "#e0e0e0",
            }}
          >
            <User size={60} color="#6c757d" />
          </div>
        )}
        <div
          className="position-absolute"
          style={{ top: "0", right: "0", cursor: "pointer" }}
          onClick={() => setModalOpen(true)}
        >
          <Edit
            className="img-fluid rounded mt-3 mb-2"
            size={20}
            color="#007bff"
          />
        </div>
      </div>
    );
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("لطفاً یک فایل تصویری (JPG, PNG) انتخاب کنید");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم فایل نباید بیشتر از 5 مگابایت باشد");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetActivePicture = async () => {
    console.log(selectedUser);
    // بررسی می‌کند که آیا فایلی برای آپلود انتخاب شده است یا خیر.
    // اگر فایلی انتخاب نشده باشد، از تابع خارج می‌شود.
    if (!selectedFile) {
      console.warn("هیچ فایلی برای آپلود انتخاب نشده است."); // پیام هشدار برای توسعه‌دهنده
      return;
    }

    // ایجاد یک شیء FormData برای ارسال داده‌ها به صورت چندقسمتی (multipart/form-data).
    const formData = new FormData();

    // 1. اضافه کردن تصویر انتخاب شده به FormData
    // 'formFile' نام فیلدی است که سرور انتظار دارد.
    formData.append("formFile", selectedFile);

    // 2. اضافه کردن تمام فیلدهای selectedUser به FormData
    // این بخش اطمینان حاصل می‌کند که تمام داده‌های کاربر انتخاب شده نیز به همراه تصویر ارسال شوند.
    // فرض بر این است که 'selectedUser' یک شیء حاوی اطلاعات کاربر است.
    if (selectedUser) {
      // اطمینان از وجود selectedUser قبل از پیمایش
      for (const key in selectedUser) {
        // بررسی می‌کند که فیلد واقعاً متعلق به شیء selectedUser باشد و null یا undefined نباشد.
        if (
          Object.hasOwnProperty.call(selectedUser, key) &&
          selectedUser[key] !== null &&
          selectedUser[key] !== undefined
        ) {
          // اگر فیلد یک فایل یا Blob باشد، آن را مستقیماً اضافه می‌کند.
          // این برای مواردی است که selectedUser ممکن است شامل فایل‌های دیگری نیز باشد.
          if (
            selectedUser[key] instanceof File ||
            selectedUser[key] instanceof Blob
          ) {
            formData.append(key, selectedUser[key]);
          } else {
            // برای سایر فیلدها (مانند رشته، عدد، بولین)، آن‌ها را به رشته تبدیل کرده و اضافه می‌کند.
            // این کار از بروز خطاهای احتمالی در سمت سرور جلوگیری می‌کند و تضمین می‌کند
            // که همه مقادیر به صورت رشته ارسال شوند.
            formData.append(key, String(selectedUser[key]));
          }
        }
      }
    }

    try {
      // فراخوانی تابع addImageUser برای آپلود تصویر به سرور.
      // این تابع باید یک API call به بک‌اند شما باشد.
      const res = await addImageUser(formData);

      // بررسی موفقیت‌آمیز بودن عملیات آپلود تصویر بر اساس پاسخ سرور.
      if (res.success) {
        // نمایش پیام موفقیت به کاربر با استفاده از toast.
        toast.success("عملیات آپلود عکس با موفقیت انجام شد");

        // استخراج imageId از پاسخ سرور.
        // فرض بر این است که imageId در res.data.imageId قرار دارد.
        // از Optional Chaining (?.) برای دسترسی ایمن به مشخصه 'data' و 'imageId' استفاده می‌شود.
        const imageId = res?.id;

        // بررسی می‌کند که imageId با موفقیت دریافت شده باشد.
        // به‌روزرسانی تصویر پروفایل کاربر
        const updateResponse = await dispatch(
          updateUser({
            ...selectedUser,
            currentPictureAddress: imageId,
          })
        );

        // بررسی موفقیت به‌روزرسانی
        if (updateResponse.meta.requestStatus === "fulfilled") {
          toast.success("تصویر پروفایل با موفقیت به‌روزرسانی شد.");
        } else {
          throw new Error(
            updateResponse.payload?.message || "خطا در تنظیم تصویر پروفایل"
          );
        }
      } else {
        // اگر آپلود تصویر ناموفق بود، یک خطا پرتاب می‌کند.
        // پیام خطا از پاسخ سرور یا یک پیام عمومی استفاده می‌کند.
        throw new Error(res.message || "خطا در آپلود تصویر");
      }
    } catch (error) {
      // گرفتن و مدیریت هرگونه خطایی که در طول فرایند (آپلود یا تنظیم تصویر) رخ می‌دهد.
      console.error("خطا در handleSetActivePicture:", error); // لاگ کردن خطای کامل برای توسعه‌دهنده
      // نمایش پیام خطای عمومی و کاربرپسند به کاربر.
      toast.error("خطا در آپلود تصویر. لطفا دوباره تلاش کنید.");
    }
  };

  // ** مدیریت تعلیق کاربر
  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "شما نمی‌توانید این عمل را بازگردانید!",
      icon: "succes",
      showCancelButton: true,
      cancelButtonText: "خیر، کاربر را فعال نکن!",
      confirmButtonText: "بله، کاربر را فعال کن!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        const res = reverseToActiveUser(selectedUser.id);
        if (res.success) {
          MySwal.fire({
            icon: "success",
            title: "فعال شد!",
            text: "کاربر با موفقیت فعال شد.",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: "عملیات فعال کردن لغو شد :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  const handleGetAcceessClick = () => {
    // لیست تمام نقش‌های ممکن
    const allRoles = [
      { id: 1, roleName: "Administrator" },
      { id: 2, roleName: "Teacher" },
      { id: 3, roleName: "Employee.Admin" },
      { id: 4, roleName: "Employee.Writer" },
      { id: 5, roleName: "Student" },
      { id: 6, roleName: "CourseAssistance" },
      { id: 7, roleName: "TournamentAdmin" },
      { id: 8, roleName: "Referee" },
      { id: 9, roleName: "TournamentMentor" },
      { id: 10, roleName: "Support" },
    ];

    // اضافه کردن وضعیت isAble به هر نقش
    const roles = allRoles.map((role) => ({
      ...role,
      isAble: selectedUser.roles?.some((userRole) => userRole.id === role.id),
    }));

    // ساخت گزینه‌های select
    const roleOptions = roles
      .map((role) => {
        const checkmark = role.isAble ? "✅" : "";

        return `<option value="${role.id}">
              ${role.roleName}${checkmark}
            </option>`;
      })
      .join("");

    return MySwal.fire({
      title: "انتخاب نقش کاربر",
      html: `
      <div class="mb-3">
        <label for="roleSelect" class="form-label">نقش کاربر را انتخاب کنید:</label>
        <select id="roleSelect" class="form-select">
          <option value="" disabled selected>لطفاً یک نقش انتخاب کنید</option>
          ${roleOptions}
        </select>
      </div>
      <p class="text-muted mt-2">نقش‌های دارای علامت ✅ از قبل به کاربر اختصاص داده شده‌اند</p>
    `,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "انصراف",
      confirmButtonText: "تایید و فعال سازی",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
      preConfirm: () => {
        const selectElement = document.getElementById("roleSelect");
        const selectedRoleId = selectElement.value;

        if (!selectedRoleId) {
          MySwal.showValidationMessage("لطفاً یک نقش انتخاب کنید");
          return false;
        }

        const selectedRole = roles.find((role) => role.id == selectedRoleId);

        return selectedRole;
      },
      allowOutsideClick: () => !MySwal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedRole = result.value;

        return getAccessToUser(
          {
            userId: selectedUser.id,
            roleId: selectedRole.id,
          },
          selectedRole.isAble
        )
          .then((res) => {
            if (res.success) {
              return MySwal.fire({
                icon: "success",
                title: "انجام شد!",
                text: `نقش "${selectedRole.roleName}" با موفقیت به کاربر اختصاص داده شد.`,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            } else {
              throw new Error(res.message || "خطا در اعطای نقش به کاربر");
            }
          })
          .catch((error) => {
            MySwal.fire({
              title: "خطا!",
              text: error.message,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
            return false;
          });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: "عملیات فعال‌سازی انجام نشد.",
          icon: "info",
          customClass: {
            confirmButton: "btn btn-info",
          },
        });
      }
      return false;
    });
  };
  const handleCancel = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setModalOpen(false);
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <Modal
                isOpen={modalOpen}
                toggle={() => setModalOpen(!modalOpen)}
                centered
                className="modal-dialog-centered"
              >
                <ModalHeader
                  toggle={() => setModalOpen(!modalOpen)}
                  style={{
                    direction: "rtl",
                    fontFamily: '"Vazirmatn", sans-serif',
                  }}
                >
                  آپلود تصویر پروفایل
                </ModalHeader>
                <ModalBody>
                  <div className="d-flex flex-column align-items-center gap-3">
                    {previewImage ? (
                      <div
                        className="position-relative"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "15px",
                          overflow: "hidden",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <img
                          src={previewImage}
                          alt="پیش‌نمایش"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "2px dashed #ccc",
                          borderRadius: "15px",
                          backgroundColor: "#f8f9fa",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Upload size={40} color="#6c757d" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        maxWidth: "300px",
                        borderRadius: "8px",
                        padding: "8px",
                        border: "1px solid #ced4da",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <p
                      className="text-muted"
                      style={{
                        fontSize: "12px",
                        direction: "rtl",
                        fontFamily: '"Vazirmatn", sans-serif',
                      }}
                    >
                      فقط فایل‌های تصویری (JPG, PNG) با حجم حداکثر 5MB مجاز
                      هستند.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter style={{ direction: "rtl" }}>
                  <Button
                    color="primary"
                    onClick={handleSetActivePicture}
                    disabled={!selectedFile}
                    style={{
                      borderRadius: "8px",
                      padding: "8px 20px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    تنظیم تصویر
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleCancel}
                    style={{
                      borderRadius: "8px",
                      padding: "8px 20px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    لغو
                  </Button>
                </ModalFooter>
              </Modal>
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.fName
                      : "الینور آگیلار"}
                  </h4>
                  {selectedUser.roles[0] ? (
                    <Badge
                      color={roleColors[selectedUser?.roles[0].roleName || ""]}
                      className="text-capitalize"
                    >
                      {selectedUser?.roles[0].roleName}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  %{selectedUser.profileCompletionPercentage}
                </h4>
                <small>تکمیل پروفایل</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.courses.length}</h4>
                <small>دوره ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span>{selectedUser.userName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ایمیل:</span>
                  <span>{selectedUser.gmail}</span>
                </li>

                <li className="mb-75 d-flex ">
                  <span className="fw-bolder me-25">نقش:</span>
                  <div className="d-flex flex-wrap gap-sm-1">
                    {selectedUser.roles && selectedUser.roles.length > 0 ? (
                      selectedUser.roles.map((role) => (
                        <Badge
                          key={role.id}
                          color={roleColors[role.roleName] || "light-secondary"}
                          className="text-capitalize"
                        >
                          {role.roleName}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-danger">
                        نقشی برای کاربر وجود ندارد
                      </span>
                    )}
                  </div>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ تولد:</span>
                  <span>{formatDatePersian(selectedUser.birthDay)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تماس:</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کدملی:</span>
                  <span>
                    {selectedUser.nationalCode || "این فیلد خالی می باشد"}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">درباره:</span>
                  <span>
                    {selectedUser.userAbout ||
                      "فیلد درباره ی کاربر خالی می باشد"}
                  </span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">آدرس:</span>
                  <span>
                    {selectedUser.homeAdderess || "این فیلد خالی می باشد"}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت:</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[selectedUser.active + ""]}
                  >
                    {selectedUser.active === true
                      ? "فعال"
                      : selectedUser.active === false
                      ? "غیرفعال"
                      : "معلق"}
                  </Badge>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            {" "}
            <Button
              className="ms-1 w-auto"
              color="success"
              outline
              onClick={handleGetAcceessClick}
            >
              اضافه کردن دسترسی
            </Button>
            <Button
              className="ms-1 w-auto"
              color="success"
              outline
              onClick={handleSuspendedClick}
            >
              فعال کردن
            </Button>{" "}
            <Button
              className="ms-1 w-auto"
              color="primary"
              onClick={() => setShow(true)}
            >
              ویرایش
            </Button>
          </div>
          <div className="d-flex justify-content-center pt-2"></div>
        </CardBody>
      </Card>

      {/* مودال ویرایش اطلاعات کاربر */}
      <EditModal setShow={setShow} show={show} selectedUser={selectedUser} />
    </Fragment>
  );
};

export default UserInfoCard;
