// ** Third Party Components
import { Calendar } from "react-feather";
import Flatpickr from "react-flatpickr";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useSelector } from "react-redux";

// ** Chart Data
const data = [
  {
    name: "7/12",
    sales: 20,
    clicks: 60,
    visits: 100,
  },
  {
    name: "8/12",
    sales: 40,
    clicks: 80,
    visits: 120,
  },
  {
    name: "9/12",
    sales: 30,
    clicks: 70,
    visits: 90,
  },
  {
    name: "10/12",
    sales: 70,
    clicks: 110,
    visits: 170,
  },
  {
    name: "11/12",
    sales: 40,
    clicks: 80,
    visits: 130,
  },
  {
    name: "12/12",
    sales: 60,
    clicks: 80,
    visits: 160,
  },
  {
    name: "13/12",
    sales: 50,
    clicks: 100,
    visits: 140,
  },
  {
    name: "14/12",
    sales: 140,
    clicks: 90,
    visits: 240,
  },
  {
    name: "15/12",
    sales: 120,
    clicks: 180,
    visits: 220,
  },
  {
    name: "16/12",
    sales: 100,
    clicks: 160,
    visits: 180,
  },
  {
    name: "17/12",
    sales: 140,
    clicks: 140,
    visits: 270,
  },
  {
    name: "18/12",
    sales: 180,
    clicks: 200,
    visits: 280,
  },
  {
    name: "19/12",
    sales: 220,
    clicks: 220,
    visits: 375,
  },
];

const CustomTooltip = (data) => {
  if (data.active && data.payload) {
    return (
      <div className="recharts-custom-tooltip">
        <p className="fw-bold mb-0">{data.label}</p>
        <hr />
        <div className="active">
          {data.payload.map((i) => {
            return (
              <div className="d-flex align-items-center" key={i.dataKey}>
                <span
                  className="bullet bullet-sm bullet-bordered me-50"
                  style={{
                    backgroundColor: i.fill,
                  }}
                ></span>
                <span className="text-capitalize me-75">
                  {i.dataKey} : {i.payload[i.dataKey]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

const SimpleAreaChart = () => {
  const { chartData, loading } = useSelector((state) => state.appDashboard);
  if (loading) return <div>در حال بارگذاری...</div>;
  return (
    <Card>
      <CardHeader className="flex-sm-row flex-column justify-content-sm-between justify-content-center align-items-sm-center align-items-start">
        <CardTitle tag="h4">نمودار مقایسه هزینه و تعداد رزرو دوره </CardTitle>
        <div className="d-flex align-items-center"></div>
      </CardHeader>

      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <div className="me-2">
            <span
              className="bullet bullet-sm bullet-[#8884d8] bullet-bordered me-50"
              style={{ backgroundColor: "#8884d8" }}
            ></span>
            <span className="align-middle">هزینه دوره</span>
          </div>
          <div className="me-2">
            <span
              className="bullet bullet-sm bullet-[#82ca9d] bullet-bordered me-50"
              style={{ backgroundColor: "#82ca9d" }}
            ></span>
            <span className="align-middle me-75">تعداد رزرو</span>
          </div>
        </div>
        <div className="recharts-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                orientation="left" // محور Y در سمت چپ
                width={80} // عرض مناسب
                tickFormatter={(value) =>
                  `${(value / 1000).toLocaleString("fa-IR")}k`
                }
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#333" }} // خط محور
                tickMargin={70} // فاصله متن از محور
              />
              <Tooltip content={CustomTooltip} />
              <Area
                type="monotone"
                dataKey="cost"
                name="هزینه (تومان)"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="reserveCount"
                name="تعداد رزرو"
                stackId="2"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="isActive"
                name="وضعیت فعال"
                stackId="3"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};
export default SimpleAreaChart;
