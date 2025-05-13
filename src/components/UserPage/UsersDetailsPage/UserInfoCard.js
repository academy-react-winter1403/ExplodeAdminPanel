// ** ایمپورت‌های ری‌اکت
import { useState, Fragment } from "react";

// ** کامپوننت‌های ری‌اکت‌استرپ
import { Card, CardBody, Button, Badge } from "reactstrap";

// ** کامپوننت‌های شخص ثالث
import Swal from "sweetalert2";

import { Check, Briefcase, X } from "react-feather";

import withReactContent from "sweetalert2-react-content";

// ** کامپوننت‌های سفارشی
import Avatar from "@components/avatar";

// ** استایل‌ها
import "@styles/react/libs/react-select/_react-select.scss";
import { formatDatePersian } from "../../../utility/Utils";

import EditModal from "../editModal";
import {
  getAccessToUser,
  reverseToActiveUser,
} from "../../../@core/services/Users";

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

  // ** هوک فرم

  // ** رندر تصویر کاربر
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.currentPictureAddress.length) {
      return (
        <img
          height="110"
          width="110"
          alt="تصویر کاربر"
          src={selectedUser.currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2 flex justify-center text-center items-center"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.avatarColor || "light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedUser.fName}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
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
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
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
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="success"
              outline
              onClick={handleSuspendedClick}
            >
              فعال کردن
            </Button>
          </div>
          <div className="d-flex justify-content-center pt-2">
            {" "}
            <Button
              className="mr-auto "
              color="success"
              outline
              onClick={handleGetAcceessClick}
            >
              اضافه کردن دسترسی
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* مودال ویرایش اطلاعات کاربر */}
      <EditModal setShow={setShow} show={show} selectedUser={selectedUser} />
    </Fragment>
  );
};

export default UserInfoCard;
