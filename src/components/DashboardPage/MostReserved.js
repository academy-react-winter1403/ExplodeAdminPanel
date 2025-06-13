// ** Reactstrap Imports
import { Table, Card, Spinner, CardTitle } from "reactstrap";

// ** Assets
import likeIcon from "@src/assets/images/icons/like.svg"; // اضافه کن به مسیر پروژه‌ت

// ** Redux
import { useSelector } from "react-redux";

const MostReservedCourseTable = () => {
  const { mostReserveCourse, loading } = useSelector(
    (state) => state.appDashboard
  );
  console.log("MostReservedCourses", mostReserveCourse);
  const renderData = () => {
    return mostReserveCourse?.map((course, index) => (
      <tr key={course.courseId}>
        <td>
          <img
            src={
              !course.tumbImageAddress ||
              course.tumbImageAddress === "null" ||
              course.tumbImageAddress === "Not-Set"
                ? "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                : course.tumbImageAddress.replace(/\\/g, "/")
            }
            alt={course.title}
            style={{
              width: "50px",
              height: "50px",

              objectFit: "cover",
            }}
          />
        </td>

        <td>
          <div className="fw-bold">{course.title}</div>
          <small className="text-muted">{course.fullName}</small>
        </td>
        <td>{course.levelName}</td>
        <td>
          <div className="d-flex align-items-center">
            <span className="fw-bold me-1">{course.reserveCount}</span>
            <img
              src={likeIcon}
              alt="like"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </td>
        <td>{Number(course.cost).toLocaleString()} تومان</td>
        <td>
          <small className="text-muted">
            {new Date(course.lastUpdate).toLocaleDateString("fa-IR")}
          </small>
        </td>
      </tr>
    ));
  };

  return (
    <div className="card pt-2 px-1">
      <CardTitle>
        <h2 className="fw-bold" style={{ fontSize: "2rem", color: "#5E5873" }}>
          دوره‌های پر‌رزرو
        </h2>
        <p className="text-muted" style={{ fontSize: "1rem" }}>
          لیست دوره‌هایی که بیشترین میزان رزرو را داشته‌اند
        </p>
      </CardTitle>
      <Card className="card-company-table">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-4">
            <Spinner
              color="primary"
              style={{ width: "3rem", height: "3rem" }}
            />
            <span className="ms-2">در حال بارگذاری دوره‌ها...</span>
          </div>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان دوره</th>
                <th>سطح</th>
                <th>رزرو</th>
                <th>هزینه</th>
                <th>آخرین بروزرسانی</th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default MostReservedCourseTable;
