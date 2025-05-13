// ** Reactstrap Imports
import { Card, CardHeader } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import htmlLabel from "../../../assets/images/icons/brands/react-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "عنوان دوره",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={
                row.tumbImageAddress && row.tumbImageAddress !== "Not-set"
                  ? row.tumbImageAddress
                  : htmlLabel
              }
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "توضیحات",
    selector: (row) => row.describe?.replace(/<[^>]+>/g, ""), // حذف تگ‌های HTML
    cell: (row) => (
      <span className="text-truncate" title={row.describe}>
        {row.describe?.replace(/<[^>]+>/g, "").slice(0, 40)}...
      </span>
    ),
  },
  {
    name: "آخرین بروزرسانی",
    selector: (row) => row.lastUpdate,
    sortable: true,
    cell: (row) => {
      const date = new Date(row.lastUpdate);
      return date.toLocaleDateString("fa-IR");
    },
  },
];

const UserProjectsList = ({ selectedUser }) => {
  // پیام سفارشی برای زمانی که داده‌ای وجود ندارد
  const NoDataComponent = () => (
    <div className="text-center py-4">
      <h5>دوره‌ای برای نمایش وجود ندارد</h5>
      <p className="text-muted">
        این کاربر تاکنون در هیچ دوره‌ای ثبت‌نام نکرده است
      </p>
    </div>
  );

  return (
    <Card>
      <CardHeader tag="h4">دوره‌های کاربر</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={selectedUser.courses || []}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<NoDataComponent />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
