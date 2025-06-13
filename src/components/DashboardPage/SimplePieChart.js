import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SimplePieChart = () => {
  const { notReserveCourseByLevel } = useSelector(
    (state) => state.appDashboard
  );

  // اگر داده‌ای وجود ندارد، نمایش پیام یا لودر
  if (!notReserveCourseByLevel || notReserveCourseByLevel.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">دوره‌های بدون رزرو</CardTitle>
        </CardHeader>
        <CardBody className="text-center text-muted">
          داده‌ای موجود نیست
        </CardBody>
      </Card>
    );
  }

  // رنگ‌های اختصاصی
  const levelColors = ["#00cfe8", "#7367f0", "#ff9f43", "#ea5455", "#28c76f"];

  const data = notReserveCourseByLevel.map((item, index) => ({
    name: item.levelName,
    value: item.percent,
    color: levelColors[index % levelColors.length],
  }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    fill,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={fill === "#fff" ? "#000" : "#fff"}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 12 }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle tag="h4">دوره‌های بدون رزرو</CardTitle>
          <small className="text-muted">براساس سطح دوره</small>
        </div>
      </CardHeader>

      <CardBody>
        <div
          className="recharts-wrapper"
          style={{
            height: "350px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer>
            <PieChart height={350}>
              <Pie
                data={data}
                innerRadius={80}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="d-flex align-items-center justify-content-center flex-wrap mt-2">
          {data.map((entry, index) => (
            <div key={index} className="me-2 mb-1 d-flex align-items-center">
              <span
                className="bullet bullet-sm bullet-bordered me-50"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="me-75">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default SimplePieChart;
