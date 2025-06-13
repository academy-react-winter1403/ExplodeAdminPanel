// ** Third Party Components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardTechReports } from "../../redux/appDashboardSlice";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TechnologyUsedChart = ({ success, gridLineColor, labelColor }) => {
  const dispatch = useDispatch();
  const { techReports } = useSelector((state) => state.appDashboard);
  useEffect(() => {
    // Fetch technology reports when the component mounts
    dispatch(getDashboardTechReports());
  }, [dispatch]);

  // Sort by countUsed in descending order and take top 10
  const sortedData = [...techReports]
    .sort((a, b) => b.countUsed - a.countUsed)
    .slice(0, 10);

  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: {
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} uses`;
          },
        },
      },
    },
  };

  // ** Chart data
  const data = {
    labels: sortedData.map((item) => item.techName),
    datasets: [
      {
        maxBarThickness: 30,
        backgroundColor: success,
        borderColor: "transparent",
        borderRadius: { topRight: 15, topLeft: 15 },
        data: sortedData.map((item) => item.countUsed),
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">بیشترین تکنولوژی های استفاده شده</CardTitle>
        <div className="d-flex align-items-center">ویرایش امروز</div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  );
};

export default TechnologyUsedChart;
