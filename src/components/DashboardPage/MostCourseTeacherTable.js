// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Table, Card, Spinner, CardTitle } from "reactstrap";

// ** Assets & Redux
import rocketIcon from "@src/assets/images/icons/rocket.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTeacherReport } from "../../redux/appDashboardSlice";
import { formatToToman } from "../../utility/Utils";

const MostCourseTeacherTable = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.appDashboard);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getTeacherReport());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const renderData = () => {
    return teachers.map((col, index) => (
      <tr key={col.teacherId}>
        <td>{index + 1}</td>
        <td>
          <div className="d-flex align-items-center">
            <div className="avatar rounded me-1">
              <div className="avatar-content">
                <img
                  src={
                    col.pictureAddress && col.pictureAddress !== "null"
                      ? col.pictureAddress.replace(/\\/g, "/")
                      : rocketIcon
                  }
                  alt={col.fullName}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="fw-bolder">{col.fullName}</div>
              <div className="font-small-2 text-muted">
                <a
                  href={col.linkdinProfileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {col.linkdinProfileLink}
                </a>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex flex-column">
            <span className="fw-bold">{col.courseCounts} دوره</span>
            <small
              style={{
                color: "#5E5873",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {col.newsCount} خبر
            </small>
          </div>
        </td>
        <td>{col.newsCount}</td>
      </tr>
    ));
  };

  return (
    <div className="card pt-2 px-1">
      <CardTitle>
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#5E5873",
            margin: "0 0 1rem 0",
          }}
        >
          مدرسین فعال
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#6e6b7b",
            fontWeight: "500",
            marginBottom: "0",
          }}
        >
          این جدول نشان‌دهنده‌ی مدرسینی است که بیشترین تعداد دوره‌ها و اخبار را
          دارند.
        </p>
      </CardTitle>
      <Card className="card-company-table">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-4">
            <Spinner
              color="primary"
              style={{ width: "3rem", height: "3rem" }}
            />
            <span className="ms-2">در حال بارگذاری اطلاعات مدرسین...</span>
          </div>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>مدرس</th>
                <th>تعداد دوره‌ها / تعداد اخبار</th>
                <th>تعداد اخبار</th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default MostCourseTeacherTable;
