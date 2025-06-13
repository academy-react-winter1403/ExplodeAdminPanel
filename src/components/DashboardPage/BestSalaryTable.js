// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Table, Card } from "reactstrap";

// ** Icons Imports
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";

// ** Icons Imports
import starIcon from "@src/assets/images/icons/star.svg";
import bookIcon from "@src/assets/images/icons/book.svg";
import brushIcon from "@src/assets/images/icons/brush.svg";
import rocketIcon from "@src/assets/images/icons/rocket.svg";
import toolboxIcon from "@src/assets/images/icons/toolbox.svg";
import speakerIcon from "@src/assets/images/icons/speaker.svg";
import parachuteIcon from "@src/assets/images/icons/parachute.svg";
import { useSelector } from "react-redux";
import { formatToToman } from "../../utility/Utils";

const BestSalaryTable = () => {
  // ** vars
  const { mostExpensiveCourse } = useSelector((state) => state.appDashboard);

  const data = [
    {
      img: toolboxIcon,
      name: "Dixons",
      email: "meguc@ruj.io",
      icon: <Monitor size={18} />,
      category: "Technology",
      views: "23.4k",
      time: "24 hours",
      revenue: "891.2",
      sales: "68",
    },
    {
      img: parachuteIcon,
      name: "Motels",
      email: "vecav@hodzi.co.uk",
      icon: <Coffee size={18} />,
      category: "Grocery",
      views: "78k",
      time: "2 days",
      revenue: "668.51",
      sales: "97",
      salesUp: true,
    },
    {
      img: brushIcon,
      name: "Zipcar",
      email: "davcilse@is.gov",
      icon: <Watch size={18} />,
      category: "Fashion",
      views: "162",
      time: "5 days",
      revenue: "522.29",
      sales: "62",
      salesUp: true,
    },
    {
      img: starIcon,
      name: "Owning",
      email: "us@cuhil.gov",
      icon: <Monitor size={18} />,
      category: "Technology",
      views: "214",
      time: "24 hour",
      revenue: "291.01",
      sales: "88",
      salesUp: true,
    },
    {
      img: bookIcon,
      name: "Cafés",
      email: "pudais@jife.com",
      icon: <Coffee size={18} />,
      category: "Grocery",
      views: "208",
      time: "1 week",
      revenue: "783.93",
      sales: "16",
    },
    {
      img: rocketIcon,
      name: "Kmart",
      email: "bipri@cawiw.com",
      icon: <Watch size={18} />,
      category: "Fashion",
      views: "990",
      time: "1 month",
      revenue: "780.05",
      sales: "78",
      salesUp: true,
    },
    {
      img: speakerIcon,
      name: "Payers",
      email: "luk@izug.io",
      icon: <Watch size={18} />,
      category: "Fashion",
      views: "12.9k",
      time: "12 hours",
      revenue: "531.49",
      sales: "42",
      salesUp: true,
    },
  ];
  const colorsArr = {
    Technology: "light-primary",
    Grocery: "light-success",
    Fashion: "light-warning",
  };

  const renderData = () => {
    return mostExpensiveCourse.map((col) => {
      const IconTag = col.ratioToAvg ? (
        <TrendingUp size={15} className="text-success" />
      ) : (
        <TrendingDown size={15} className="text-danger" />
      );

      return (
        <>
          <tr key={col.name}>
            <td>
              <div className="d-flex align-items-center">
                <div className="avatar rounded">
                  <div className="avatar-content">
                    {col.tumbImageAddress != "null" ? (
                      <div>
                        <img
                          style={{
                            width: "40px",
                            height: "40px",

                            objectFit: "cover",
                          }}
                          src={col.tumbImageAddress}
                          alt={col.fullName}
                        />
                      </div>
                    ) : (
                      <img
                        style={{
                          width: "40px",
                          height: "40px",

                          objectFit: "cover",
                        }}
                        src={rocketIcon}
                        alt="پیش فرض"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="fw-bolder">{col.fullName}</div>
                  <div className="font-small-2 text-muted">{col.typeName}</div>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="justify-co">{col.classRoomName}</span>
              </div>
            </td>
            <td className="text-nowrap">
              <div className="d-flex flex-column">
                <span className="fw-bolder mb-25">
                  {formatToToman(col.cost)}
                </span>
                <span className="font-small-2 text-muted">
                  {col.reserveCount} رزرو
                </span>
              </div>
            </td>
            <td>{col.levelName}</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="fw-bolder me-1">{col.ratioToAvg}%</span>
                {IconTag}
              </div>
            </td>
          </tr>
        </>
      );
    });
  };

  return (
    <Card className="card-company-table">
      <Table responsive>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>عنوان دوره</th>
            <th>قیمت / تعداد رزرو</th>
            <th>سطح</th>
            <th>تفاوت با میانگین قیمت</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  );
};

export default BestSalaryTable;
