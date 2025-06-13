// ** Third Party Components
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";
import { formatToTwoDecimals } from "../../utility/Utils";

const UserChart = ({ success }) => {
  const { reports } = useSelector((state) => state.appDashboard);
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ["فعال ", "غیرفعال "],
    stroke: { width: 0 },
    colors: ["#28C76F", "#EA5455"], // سبز روشن برای فعال، قرمز تیره برای غیرفعال
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "فعال",
              formatter() {
                return formatToTwoDecimals(reports.activeUserPercent) + "%";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-1">
              {" "}
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  background: "#28C76F",
                  borderRadius: "50%",
                  marginLeft: "8px",
                }}
              ></span>
              آمار کاربران
            </CardTitle>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  color: "#28C76F",
                  margin: "0 8px 0 0",
                  lineHeight: 1,
                }}
              >
                {formatToTwoDecimals(reports.activeUserPercent)}%
              </h2>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#6e6b7b",
                  fontWeight: "500",
                }}
              >
                کاربران فعال
              </span>
            </div>
            <CardText className="text-muted font-small-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(234, 84, 85, 0.08)",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "#EA5455",
                      borderRadius: "50%",
                      marginLeft: "8px",
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      color: "#5e5873",
                      fontWeight: "600",
                    }}
                  >
                    <span style={{ color: "#EA5455" }}>
                      {formatToTwoDecimals(reports.interActiveUserPercent)}%
                    </span>{" "}
                    کاربران غیرفعال
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#b9b9c3",
                    marginTop: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fas fa-info-circle"
                    style={{ marginLeft: "4px" }}
                  ></i>
                  آخرین بروزرسانی: امروز ۱۴:۳۰
                </div>
              </div>
            </CardText>
          </Col>
          <Col xs="6">
            <Chart
              options={options}
              series={[
                formatToTwoDecimals(reports.activeUserPercent),
                formatToTwoDecimals(reports.interActiveUserPercent),
              ]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserChart;
