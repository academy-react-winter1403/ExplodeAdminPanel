// ** Icons Imports
import { Book, UserCheck, Users, AlertCircle, BarChart2 } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, Badge, Progress } from "reactstrap";
import { useSelector } from "react-redux";
import { formatToTwoDecimals } from "../../utility/Utils";

const ReserveDataProgress = () => {
  // آمار واقعی
  const { reports } = useSelector((state) => state.appDashboard);

  return (
    <Card className="admin-dashboard-card-light">
      <CardBody className="card-body-content">
        <div className="stats-grid">
          <div
            className="stat-card info"
            style={{ borderTop: "3px solid #7367F0" }}
          >
            <Users
              size={20}
              className="stat-icon"
              style={{ backgroundColor: "#7367F0", color: "white" }}
            />
            <div>
              <h3 style={{ color: "#7367F0" }}>{reports.allReserve}</h3>
              <span>کل رزروها</span>
            </div>
          </div>

          <div
            className="stat-card success"
            style={{ borderTop: "3px solid #28C76F" }}
          >
            <Book
              size={20}
              className="stat-icon"
              style={{ backgroundColor: "#28C76F", color: "white" }}
            />
            <div>
              <h3 style={{ color: "#28C76F" }}>{reports.allReserveAccept}</h3>
              <span>رزرو های تایید شده</span>
            </div>
          </div>

          <div
            className="stat-card danger"
            style={{ borderTop: "3px solid #EA5455" }}
          >
            <AlertCircle
              size={20}
              className="stat-icon"
              style={{ backgroundColor: "#EA5455", color: "white" }}
            />
            <div>
              <h3 style={{ color: "#EA5455" }}>
                {reports.allReserveNotAccept}
              </h3>
              <span>رزرو های تایید نشده</span>
            </div>
          </div>
        </div>

        <div className="reservation-section">
          <div className="section-header">
            <UserCheck size={18} className="section-icon" />
            <h4>وضعیت رزروها</h4>
            <Badge color="light-primary">کل: {reports.allReserve}</Badge>
          </div>

          <div className="progress-container">
            <div className="progress-labels">
              <span className="text-success">
                تایید شده:
                <small>
                  ({formatToTwoDecimals(reports.reserveAcceptPercent)}%)
                </small>
              </span>
              <span className="text-danger">
                رد شده:
                <small>
                  ({formatToTwoDecimals(reports.reserveNotAcceptPercent)}%)
                </small>
              </span>
            </div>
            <Progress multi className="custom-progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${reports.reserveAcceptPercent}%`,
                  backgroundColor: "#28C76F",
                }}
                aria-valuenow={formatToTwoDecimals(
                  reports.reserveAcceptPercent
                )}
                aria-valuemin="0"
                aria-valuemax="100"
              />
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${reports.reserveNotAcceptPercent}%`,
                  backgroundColor: "rgb(234, 84, 85)",
                }}
                aria-valuenow={formatToTwoDecimals(
                  reports.reserveNotAcceptPercent
                )}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </Progress>
          </div>
        </div>
      </CardBody>

      <style jsx>{`
        .admin-dashboard-card-light {
          border: none;
          border-radius: 0.5rem;
          background: #fff;
          color: #5e5873;
          overflow: hidden;
          box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
          border: 1px solid rgba(34, 41, 47, 0.05);
          transition: all 0.3s ease;
        }

        .admin-dashboard-card-light:hover {
          box-shadow: 0 4px 25px 0 rgba(34, 41, 47, 0.15);
          transform: translateY(-2px);
        }

        .card-body-content {
          padding: 1.5rem;
          position: relative;
        }

        .main-avatar {
          box-shadow: 0 3px 10px rgba(115, 103, 240, 0.15);
          margin-bottom: 1rem;
        }

        .dashboard-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #5e5873;
        }

        .dashboard-subtitle {
          color: #6e6b7b;
          font-size: 0.9rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          border-radius: 0.5rem;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(34, 41, 47, 0.05);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 25px 0 rgba(34, 41, 47, 0.1);
        }

        .stat-card.success {
          border-top: 3px solid #28c76f;
        }

        .stat-card.info {
          border-top: 3px solid #00cfe8;
        }

        .stat-card.danger {
          border-top: 3px solid #ea5455;
        }

        .stat-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.2rem;
          color: #5e5873;
        }

        .stat-card span {
          font-size: 0.8rem;
          color: #6e6b7b;
        }

        .stat-icon {
          color: #fff;
          padding: 0.5rem;
          border-radius: 50%;
        }

        .stat-card.success .stat-icon {
          background-color: #28c76f;
        }

        .stat-card.info .stat-icon {
          background-color: #00cfe8;
        }

        .stat-card.danger .stat-icon {
          background-color: #ea5455;
        }

        .reservation-section {
          border-radius: 0.5rem;
          padding: 1.25rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: #5e5873;
        }

        .section-icon {
          color: #7367f0;
        }

        .section-header h4 {
          font-size: 1.1rem;
          margin: 0;
          font-weight: 500;
        }

        .progress-container {
          margin-top: 1.25rem;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }

        .custom-progress {
          height: 6px;
          border-radius: 3px;
          background: rgba(34, 41, 47, 0.05);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Card>
  );
};

export default ReserveDataProgress;
