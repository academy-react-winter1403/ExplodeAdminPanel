// ** Third Party Components
import classnames from "classnames";
import {
  DollarSign,
  Calendar,
  User,
  UserMinus,
  Book,
  UserCheck,
  FileText,
  Users,
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLandingReports } from "../../redux/appDashboardSlice";

const TeacherStateCard = ({ cols }) => {
  const dispatch = useDispatch();
  const { teachersReport } = useSelector((state) => state.appDashboard); // اسم درست slice

  useEffect(() => {
    dispatch(getLandingReports());
  }, [dispatch]);

  const data = [
    {
      title: teachersReport.teacherCount || "0",
      subtitle: "تعداد اساتید",
      color: "light-primary",
      icon: <Users size={24} />,
    },
    {
      title: teachersReport.studentCount || "0",
      subtitle: "تعداد دانشجویان",
      color: "light-success",
      icon: <UserCheck size={24} />,
    },
    {
      title: teachersReport.courseCount || "0",
      subtitle: "تعداد دوره‌ها",
      color: "light-warning",
      icon: <Book size={24} />,
    },
    {
      title: teachersReport.newsCount || "0",
      subtitle: "تعداد اخبار منتشر شده",
      color: "light-danger",
      icon: <FileText size={24} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      const number = parseInt(item.title.toString().replace(/,/g, ""), 10) || 0;

      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">
                <CountUp start={1} end={number} duration={3} separator="," />
              </h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">آمار و اطلاعات</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">
          ویرایش امروز
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default TeacherStateCard;
