import { Users } from "react-feather";
import StatsWithAreaChart from "./StateWithAreaChart";
import { useSelector } from "react-redux";

const MostReservedWithArea = () => {
  const { filteredCourse, mostReserve } = useSelector(
    (state) => state.appDashboard
  );

  const customChartOptions = {
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
    colors: ["#ff9f43"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
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

  return (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color="warning"
      stats={mostReserve}
      statTitle="نمودار رزرو 20 دوره اخیر"
      options={customChartOptions}
      series={[
        {
          data: filteredCourse?.map((item) => item.countLike) || [],
          name: "لایک‌ها",
        },
      ]}
      type="area"
    />
  );
};

export default MostReservedWithArea;
