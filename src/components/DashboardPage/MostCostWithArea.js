import { Package } from "react-feather";
import StatsWithAreaChart from "./StateWithAreaChart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDashboardCourses } from "../../redux/appDashboardSlice";
const MostCostWithArea = () => {
  const { filteredCourse, bestCost } = useSelector(
    (state) => state.appDashboard
  );
  //most reserved and most cost in last 20 courses
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch technology reports when the component mounts
    dispatch(getDashboardCourses());
  }, [dispatch]);
  return (
    <StatsWithAreaChart
      icon={<Package />}
      color="primary"
      stats={"$" + bestCost}
      statTitle="نمودار درآمد 20 دوره اخیر"
      series={[
        {
          data: filteredCourse?.map((item) => item.price) || [],
          name: "لایک‌ها",
        },
      ]}
    />
  );
};
export default MostCostWithArea;
