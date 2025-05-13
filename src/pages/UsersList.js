// ** User List Component
import Table from "../components/UserPage/list/Table";
import { useEffect } from "react";
// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { useState } from "react";
// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";
import { getAllUsers } from "@src/@core/services/Users";
// ** Styles
import "@styles/react/apps/app-users.scss";
import CountUp from "react-countup";
// import { useSelector } from "react-redux";
const UsersList = () => {
  const [total, setTotal] = useState(0);
  const [roleCoount, setRoleCount] = useState(0);
  const fetchData = async () => {
    const res = await getAllUsers();
    setTotal(res.totalCount);
    setRoleCount(res.roles.length);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {" "}
                <CountUp
                  start={1}
                  end={total}
                  duration={3}
                  separator=","
                  style={{ fontSize: "2rem", fontWeight: "bold" }}
                />
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Role Count"
            icon={<UserPlus size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                <CountUp
                  start={1}
                  end={roleCoount}
                  duration={3}
                  separator=","
                  style={{ fontSize: "2rem", fontWeight: "bold" }}
                />
              </h3>
            }
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default UsersList;
