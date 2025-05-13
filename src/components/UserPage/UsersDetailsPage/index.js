// ** ایمپورت‌های ری‌اکت
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** استور و اکشن‌ها
import { useSelector, useDispatch } from "react-redux";

// ** کامپوننت‌های ری‌اکت‌استرپ
import { Row, Col, Alert, Spinner } from "reactstrap";

// ** کامپوننت‌های نمایش کاربر
import UserTabs from "./Tabs";
import PlanCard from "./PlanCard";
import UserInfoCard from "./UserInfoCard";

// ** استایل‌ها
import "@styles/react/apps/app-users.scss";
import { getUser } from "../../../redux/appUsersSlice";

const UserView = () => {
  // ** متغیرهای استور
  const store = useSelector((state) => state.appUsers);
  const dispatch = useDispatch();

  // ** هوک‌ها
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // حالت لودینگ

  // ** دریافت اطلاعات کاربر هنگام مونت شدن
  useEffect(() => {
    setLoading(true);
    dispatch(getUser(parseInt(id)))
      .unwrap()
      .finally(() => setLoading(false));
  }, [dispatch, id]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // حالت لودینگ
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
        <p className="mt-1">در حال دریافت اطلاعات کاربر...</p>
      </div>
    );
  }

  // حالت خطا (کاربر یافت نشد)
  if (store.selectedUser === null || store.selectedUser === undefined) {
    return (
      <Alert color="danger">
        <h4 className="alert-heading">کاربر یافت نشد</h4>
        <div className="alert-body">
          کاربر با شناسه: {id} وجود ندارد. لیست تمام کاربران را بررسی کنید:{" "}
          <Link to="/apps/user/list">لیست کاربران</Link>
        </div>
      </Alert>
    );
  }

  // حالت عادی (نمایش اطلاعات کاربر)
  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
          <PlanCard />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            selectedUser={store.selectedUser}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserView;
