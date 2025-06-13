// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import PropTypes from "prop-types";
import classnames from "classnames";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

// ** Chart Options
const areaChartOptions = {
  chart: {
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  grid: { show: false },
  colors: ["#7367F0"],
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 2.5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.7,
      opacityTo: 0.5,
      stops: [0, 80, 100],
    },
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
  },
  yaxis: { labels: { show: false } },
  tooltip: { x: { show: false } },
};

const lineChartOptions = {
  chart: {
    toolbar: { show: false },
    sparkline: { enabled: true },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 0,
      blur: 4,
      opacity: 0.1,
    },
  },
  grid: { show: false },
  colors: ["#7367F0"],
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      gradientToColors: ["#A9A2F6"],
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
  },
  yaxis: { labels: { show: false } },
  tooltip: { x: { show: false } },
};

const StatsWithAreaChart = (props) => {
  // ** Props
  const {
    icon,
    color,
    stats,
    statTitle,
    series,
    options,
    type,
    height,
    className,
    ...rest
  } = props;

  return (
    <Card {...rest}>
      <CardBody
        className={classnames("pb-0", {
          [className]: className,
        })}
      >
        <Avatar
          className="avatar-stats p-50 m-0"
          color={`light-${color}`}
          icon={icon}
        />
        <h2 className="fw-bolder mt-1">{stats}</h2>
        <p className="card-text">{statTitle}</p>
      </CardBody>
      <Chart
        options={options}
        series={series}
        type={type}
        height={height ? height : 100}
      />
    </Card>
  );
};

// ** PropTypes
StatsWithAreaChart.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  statTitle: PropTypes.string.isRequired,
};

// ** Default Props
StatsWithAreaChart.defaultProps = {
  color: "primary",
  options: areaChartOptions,
  type: "area",
  height: "100",
};

export default StatsWithAreaChart;
