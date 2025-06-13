// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Row, Col, CardTitle, Button } from "reactstrap";
//import { Package } from "react-feather";
// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Components
import StatsCard from "../components/DashboardPage/StatsCard";
//import ChartjsRadarChart from "../components/DashboardPage/ReserveChartjs";

// ** Hooks
import { useSkin } from "@hooks/useSkin";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import UserChart from "../components/DashboardPage/UserChart";
import TechnologyUsedChart from "../components/DashboardPage/TechnologyUsedChart";
// import { kFormatter } from "../utility/Utils";
// import StatsWithAreaChart from "../components/DashboardPage/StateWithAreaChart";
// import CommentChart from "../components/DashboardPage/CommentChart";
import ReserveDataProgress from "../components/DashboardPage/ReserveDataProgress";
import MostReservedWithArea from "../components/DashboardPage/MostReservedWithArea";
import MostCostWithArea from "../components/DashboardPage/MostCostWithArea";
import SimpleAreaChart from "../components/DashboardPage/AllCourseAnalysChart";
import BestCostInGroupsChart from "../components/DashboardPage/BestCostInGroupsChart";
import { useSelector } from "react-redux";
import EnhancedAverageCostChart from "../components/DashboardPage/ChartForCompareAvgCost";
import TeacherStateCard from "../components/DashboardPage/TeacherStateCard";
import BestSalaryTable from "../components/DashboardPage/BestSalaryTable";
import AskQuestionFromAI from "../components/DashboardPage/AskQuestionAi";
import {
  getSalesStrategyAnalysis,
  getSellAnalysis,
} from "../@core/services/dashboardReports";
import AnalysisDisplay from "../components/DashboardPage/AnalysisDisplay";
import AnalysisButton from "../components/DashboardPage/AnalysisButton";
import SimplePieChart from "../components/DashboardPage/SimplePieChart";
import ReserveState from "../components/DashboardPage/ReserveState";
import MostCourseTeacherTable from "../components/DashboardPage/MostCourseTeacherTable";
import MostReservedCourseTable from "../components/DashboardPage/MostReserved";

const Home = () => {
  const { courses, bestCostInGroup, avrageCostEachType, mostReserveCourse } =
    useSelector((state) => state.appDashboard);
  const [loading, setLoading] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiResultReserve, setAiResultReserve] = useState(null);
  const donut = {
    series1: "#ffe700",
    series2: "#00d4bd",
    series3: "#826bf8",
    series4: "#2b9bf4",
    series5: "#FFA1A1",
  };
  // ** Context
  const { colors } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b",
    tooltipShadow = "rgba(0, 0, 0, 0.25)",
    gridLineColor = "rgba(200, 200, 200, 0.2)",
    lineChartPrimary = "#666ee8",
    lineChartDanger = "#ff4961",
    warningColorShade = "#ffbd1f",
    warningLightColor = "#FDAC34",
    successColorShade = "#28dac6",
    primaryColorShade = "#836AF9",
    infoColorShade = "#299AFF",
    yellowColor = "#ffe800",
    greyColor = "#4F5D70",
    blueColor = "#2c9aff",
    blueLightColor = "#84D0FF",
    greyLightColor = "#EDF1F4";
  // const options = {
  //   chart: {
  //     id: "revenue",
  //     toolbar: {
  //       show: false,
  //     },
  //     sparkline: {
  //       enabled: true,
  //     },
  //   },
  //   grid: {
  //     show: false,
  //   },
  //   colors: ["red"],
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //     width: 2.5,
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 0.9,
  //       opacityFrom: 0.7,
  //       opacityTo: 0.5,
  //       stops: [0, 80, 100],
  //     },
  //   },

  //   xaxis: {
  //     labels: {
  //       show: false,
  //     },
  //     axisBorder: {
  //       show: false,
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       show: false,
  //     },
  //   },
  //   tooltip: {
  //     x: { show: false },
  //   },
  // };
  // تعریف رنگ‌های پایه با ترکیب theme colors و skin
  // const chartColors = {
  //   tooltipShadow:
  //     skin === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.1)",
  //   successColorShade: colors.success.main,
  //   warningLightColor: colors.warning.light,
  //   primary: colors.primary.main,
  //   textColor: skin === "dark" ? "#b4b7bd" : "#6e6b7b",
  //   gridLineColor:
  //     skin === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
  //   labelColor: skin === "dark" ? "#b4b7bd" : "#6e6b7b",
  // };
  //<CommentChart direction={"ltr"} />
  // ** Function to handle AI analysis
  const handleAIAnalysis = async () => {
    setLoading(true);
    try {
      const res = await getSalesStrategyAnalysis(
        courses,
        bestCostInGroup,
        avrageCostEachType
      );
      if (res && typeof res === "object" && res.success) {
        console.log("AI Analysis Result:", res);
        setAiResult(res);
      } else {
        console.error("Invalid response structure:", res);
        // می‌توانید پیام خطا به کاربر نمایش دهید
      }
    } catch (error) {
      console.error(
        "Error in handleAIAnalysis:",
        error.message,
        error.response?.data
      );
      // می‌توانید پیام خطا به کاربر نمایش دهید
    } finally {
      setLoading(false);
    }
  };
  const handleLikeAndReserveAi = async () => {
    setLoadingAnalysis(true);
    try {
      const res = await getSellAnalysis(mostReserveCourse);
      // بررسی ساختار پاسخ
      if (res) {
        setAiResultReserve(res);
      } else {
        console.error("Invalid response structure:", res);
        // می‌توانید یک پیام خطا به کاربر نمایش دهید
      }
    } catch (error) {
      console.error("Error in handleLikeAndReserveAi:", error.message);
      // می‌توانید یک پیام خطا به کاربر نمایش دهید، مثلاً با useState یا یک toast
    } finally {
      setLoadingAnalysis(false);
    }
  };
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <h2 className="title">داده های کلی</h2>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
        <Col xl="4" md="6" xs="12">
          <UserChart success={colors.success.main} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" md="12" xs="12">
          {" "}
          <TechnologyUsedChart
            success={successColorShade}
            labelColor={labelColor}
            gridLineColor={gridLineColor}
          />
        </Col>
        <Col lg="6" md="12" xs="12">
          {" "}
          <Row className="match-height">
            {" "}
            <Col lg="6" md="6" xs="12">
              <MostCostWithArea />
            </Col>
            <Col lg="6" md="6" xs="12">
              <MostReservedWithArea />
            </Col>
          </Row>
          <Row className="match-height">
            {" "}
            <Col lg="12" md="6" xs="12">
              {" "}
              <ReserveDataProgress />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="match-height">
        <h2>تحلیل مالی</h2>
      </Row>
      <Row>
        <Col lg="12" md="12" xs="12">
          <SimpleAreaChart />
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="12" xs="12">
          {" "}
          <BestCostInGroupsChart info={colors.lineChartPrimary} />
        </Col>
        <Col lg="6" md="12" xs="12">
          {" "}
          <EnhancedAverageCostChart />
        </Col>
      </Row>
      <Row className="match-height">
        <h2>تحلیل مالی با هوش مصنوعی</h2>
        <p>
          با استفاده از هوش مصنوعی، می‌توانیم تحلیل‌های عمیق‌تری از داده‌های
          مالی خود داشته باشیم. این تحلیل‌ها می‌توانند به ما کمک کنند تا
          استراتژی‌های بهتری برای فروش و بازاریابی دوره‌ها ایجاد کنیم.
        </p>
        <AnalysisDisplay aiResult={aiResult} loading={loading} />
        <AnalysisButton
          buttonText={"تحلیل مالی توسط هوش مصنوعی"}
          loading={loading}
          onClick={handleAIAnalysis}
        />
      </Row>
      <Row>
        <div className="card py-2">
          {" "}
          <CardTitle>گران ترین دوره ها</CardTitle>
          <BestSalaryTable />
        </div>
      </Row>
      <Row className="match-height">
        <h2>تحلیل شاخص‌های محبوبیت و تعامل کاربران</h2>
      </Row>
      <Row className="match-height">
        <Col xl="8" md="6" xs="12">
          <TeacherStateCard cols={{ xl: "3", sm: "6" }} />
        </Col>
        <Col xl="4" md="6" xs="12">
          <ReserveState success={colors.success.main} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" md="12" xs="12">
          {" "}
          <SimplePieChart
            series1={donut.series1}
            series2={donut.series2}
            series3={donut.series3}
            series5={donut.series5}
          />
        </Col>
        <Col lg="6" md="12" xs="12">
          <MostCourseTeacherTable />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" md="12" xs="12">
          <MostReservedCourseTable success={colors.success.main} />
        </Col>
      </Row>
      <Row className="match-height">
        <h2>تحلیل تعامل کاربران با دوره‌ها و میزان استقبال و رزرو</h2>
        <p>
          با استفاده از هوش مصنوعی، می‌توانیم تحلیل‌های عمیق‌تری از داده‌های
          مالی خود داشته باشیم. این تحلیل‌ها می‌توانند به ما کمک کنند تا
          استراتژی‌های بهتری برای فروش و بازاریابی دوره‌ها ایجاد کنیم.
        </p>
        <AnalysisDisplay aiResult={aiResultReserve} loading={loadingAnalysis} />
        <AnalysisButton
          buttonText={"تحلیل تعامل کاربران با دوره‌ها"}
          loading={loadingAnalysis}
          onClick={handleLikeAndReserveAi}
        />
      </Row>
      <Row className="match-height">
        <Col lg="12" md="12" xs="12">
          <AskQuestionFromAI />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
