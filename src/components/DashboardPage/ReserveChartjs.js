// ** React Imports
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Monitor, Tablet, ArrowDown, ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartjsRadarChart = ({
  tooltipShadow,
  successColorShade,
  warningLightColor,
  primary,
}) => {
  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label(context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
        boxShadow: tooltipShadow,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#e0e0e0",
        borderWidth: 1,
      },
    },
  };

  // ** Chart data
  const data = {
    labels: ["Tablet", "Mobile", "Desktop"],
    datasets: [
      {
        data: [74.34, 25.66],
        backgroundColor: [successColorShade, warningLightColor, primary],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Sessions By Device</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "275px" }}>
          <Doughnut data={data} options={options} />
        </div>
        <div className="d-flex justify-content-between mt-3 mb-1">
          <div className="d-flex align-items-center">
            <Monitor size={17} className="text-primary" />
            <span className="fw-bold ms-75 me-25">Desktop</span>
            <span>- 80%</span>
          </div>
          <div>
            <span>2%</span> <ArrowUp className="text-success" size={14} />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <div className="d-flex align-items-center">
            <Tablet size={17} className="text-warning" />
            <span className="fw-bold ms-75 me-25">Mobile</span>
            <span>- 10%</span>
          </div>
          <div>
            <span>8%</span> <ArrowUp className="text-success" size={14} />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Tablet size={17} className="text-success" />
            <span className="fw-bold ms-75 me-25">Tablet</span>
            <span>- 10%</span>
          </div>
          <div>
            <span>-5%</span> <ArrowDown className="text-danger" size={14} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsRadarChart;
