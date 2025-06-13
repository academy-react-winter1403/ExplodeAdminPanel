// ** Third Party Components
import classnames from "classnames";
import { DollarSign, Calendar, User, UserMinus } from "react-feather";

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
import { getDashboardReports } from "../../redux/appDashboardSlice";

const StatsCard = ({ cols }) => {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.appDashboard); // اسم درست slice

  useEffect(() => {
    dispatch(getDashboardReports());
  }, [dispatch]);

  const data = [
    {
      title: reports.allPaymentCost || "0", // ← داینامیک از Redux
      subtitle: "کل پرداختی‌ها",
      color: "light-primary",
      icon: <DollarSign size={24} />,
    },
    {
      title: reports.allReserve || "0",
      subtitle: "کل رزروها",
      color: "light-info",
      icon: <Calendar size={24} />,
    },
    {
      title: reports.allUser || "0",
      subtitle: "کل کاربران",
      color: "light-info",
      icon: <User size={24} />,
    },
    {
      title: reports.inCompeletUserCount || "0",
      subtitle: "پروفایل‌های ناقص",
      color: "light-danger",
      icon: <UserMinus size={24} />,
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

export default StatsCard;
