// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { deleteUser, getUser } from "../../../redux/appUsersSlice";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.pictureAddress | (row.pictureAddress !== "Not-set")) {
    return (
      <Avatar
        className="me-1"
        img={row.pictureAddress}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.pictureAddress || "light-primary"}
        content={row.fname || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
    administrator: {
      // اضافه کردن نقش‌های جدید
      class: "text-danger",
      icon: Slack,
    },
    tournamentadmin: {
      class: "text-danger",
      icon: Slack,
    },
    employeeadmin: {
      class: "text-warning",
      icon: User,
    },
    support: {
      class: "text-info",
      icon: Slack,
    },
    teacher: {
      class: "text-success",
      icon: Settings,
    },
    student: {
      class: "text-primary",
      icon: User,
    },
  };

  // تبدیل رشته userRoles به آرایه و حذف فاصله‌ها + تبدیل به حروف کوچک
  const roles =
    row.userRoles?.split(",").map((role) => role.trim().toLowerCase()) || [];

  // پیدا کردن اولین نقشی که در roleObj وجود دارد
  const matchedRole = roles.find((role) => roleObj[role]);

  // اگر نقشی پیدا نشد، از مقدار پیش‌فرض استفاده کن
  const roleData = matchedRole
    ? roleObj[matchedRole]
    : { class: "", icon: Edit2 };

  const Icon = roleData.icon;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon size={18} className={`${roleData.class} me-50`} />
      {matchedRole || "No Role"}
    </span>
  );
};

const statusObj = {
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "User",
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.fname,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/userdetail/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.fname}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Role",
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.userRoles,
    cell: (row) => renderRole(row),
  },
  {
    name: "createDate",
    minWidth: "138px",
    sortable: true,
    sortField: "insertDate",
    selector: (row) => row.insertDate,
    cell: (row) => <span className="text-capitalize">{row.insertDate}</span>,
  },
  {
    name: "CompletionPer",
    minWidth: "230px",
    sortable: true,
    sortField: "CompletionPer",
    selector: (row) => row.profileCompletionPercentage,
    cell: (row) => (
      <span className="text-capitalize">
        %{row.profileCompletionPercentage}
      </span>
    ),
  },
  {
    name: "Status",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusObj[row.active ? "active" : "inactive"]}
        pill
      >
        {row.active ? "active" : "inactive"}
      </Badge>
    ),
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/userdetail/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/userdetail/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                store.dispatch(deleteUser(row.id));
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
