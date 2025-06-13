import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";

// reactstrap imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

const EnhancedAverageCostChart = ({ direction = "rtl" }) => {
  const { courses, avrageCostEachType } = useSelector(
    (state) => state.appDashboard
  );

  if (!courses?.courseDtos?.length || !avrageCostEachType) {
    return <div>در حال بارگذاری داده‌ها...</div>;
  }
  const labels = Object.keys(avrageCostEachType);

  const colors = [
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(201, 203, 207, 0.6)",
    "rgba(255, 205, 86, 0.6)",
  ];

  const barData = [];
  const barColors = [];
  const scatterData = [];

  labels.forEach((type, index) => {
    const avg = Number(avrageCostEachType[type]);
    barData.push(avg);
    barColors.push(colors[index % colors.length]);

    const typeCourses = courses.courseDtos.filter((c) => c.typeName === type);
    typeCourses.forEach((c) => {
      const cost = Number(c.cost);
      scatterData.push({
        x: type,
        y: cost,
        backgroundColor:
          cost > avg * 1.5 || cost < avg * 0.5
            ? "#e74c3c"
            : colors[index % colors.length],
        radius: 6,
      });
    });
  });

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "میانگین قیمت هر نوع دوره",
        data: barData,
        backgroundColor: barColors,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        type: "scatter",
        label: "قیمت‌های واقعی",
        data: scatterData,
        parsing: {
          xAxisKey: "x",
          yAxisKey: "y",
        },
        backgroundColor: scatterData.map((d) => d.backgroundColor),
        pointRadius: scatterData.map((d) => d.radius),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // مهم برای ریسپانسیو شدن ارتفاع
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed?.y ?? context.raw;
            if (context.dataset.type === "scatter") {
              return `قیمت دوره: ${value.toLocaleString()} تومان`;
            }
            return `میانگین: ${value.toLocaleString()} تومان`;
          },
        },
      },
      title: {
        display: true,
        text: "مقایسه میانگین قیمت با قیمت واقعی دوره‌ها",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "نوع دوره" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "قیمت (تومان)" },
        ticks: {
          callback: (value) => `${value.toLocaleString()} ت`,
        },
      },
    },
  };

  // مجموع کل برای نمایش در کارت (اختیاری)
  const totalAverage = barData.reduce((acc, val) => acc + val, 0);

  return (
    <Card
      style={{
        marginBottom: "0",
        height: "100%",
        minHeight: "350px",
        width: "100%",
        maxWidth: "900px",
        maxHeight: "497px",
      }}
      className="mx-auto"
    >
      <CardHeader className="d-flex mb-0 flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
        <div>
          <CardSubtitle className="text-muted mb-1">
            میانگین قیمت دوره‌ها بر اساس نوع
          </CardSubtitle>
        </div>
        <div className="d-flex align-items-center mt-md-0 mt-1">
          آخرین بروزرسانی
        </div>
      </CardHeader>
      <CardBody
        style={{ direction, position: "relative", height: "100%" }}
        className="p-0"
      >
        <Chart
          type="bar"
          data={data}
          options={options}
          style={{ width: "100%", height: "100%" }}
        />
      </CardBody>
    </Card>
  );
};

export default EnhancedAverageCostChart;
