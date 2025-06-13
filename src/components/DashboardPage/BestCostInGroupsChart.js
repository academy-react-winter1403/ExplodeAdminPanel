// ** Third Party Components
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import { useSelector } from "react-redux";
import { formatToToman } from "../../utility/Utils";

const BestCostInGroupsChart = ({ info, direction }) => {
  const { bestCostInGroup } = useSelector((state) => state.appDashboard);

  // Prepare data for chart
  const categories = bestCostInGroup.map((course) => course.level);
  const seriesData = bestCostInGroup.map((course) =>
    parseFloat(course.bestInLevel)
  );
  const total = bestCostInGroup.reduce((sum, course) => {
    const cost = parseFloat(course.cost) || 0; // Convert to number (handle invalid values)
    return sum + cost;
  }, 0);

  // ** Chart Options
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "30%",
        borderRadius: 8,
        borderRadiusApplication: "end",
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    colors: info,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        formatter: function (value) {
          return new Intl.NumberFormat().format(value / 1000) + "K";
        },
      },
      title: {
        text: "درآمد",
      },
    },

    yaxis: {
      opposite: direction === "rtl",
      labels: {
        show: true,
        style: {
          colors: info,
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return new Intl.NumberFormat().format(value);
        },
      },
    },
  };

  // ** Chart Series
  const series = [
    {
      name: "درآمد ",
      data: seriesData,
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
        <div>
          <CardSubtitle className="text-muted mb-25">
            برآورد درآمد سودمندترین دوره هر سطح
          </CardSubtitle>
          <CardTitle className="fw-bolder" tag="h4">
            {formatToToman(total)}
          </CardTitle>
        </div>
        <div className="d-flex align-items-center mt-md-0 mt-1">
          ویرایش امروز
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="bar" height={400} />
      </CardBody>
    </Card>
  );
};

export default BestCostInGroupsChart;
