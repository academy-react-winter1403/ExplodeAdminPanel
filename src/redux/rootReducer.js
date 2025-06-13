// ** Reducers Imports
import auth from "./authentication";
import layout from "./layout";
import navbar from "./navbar";
import appUsers from "./appUsersSlice";
import appDashboard from "./appDashboardSlice";
import appCalendar from "./CalendarSlice";

const rootReducer = {
  navbar,
  layout,
  auth,
  appUsers,
  appDashboard,
  appCalendar,
};

export default rootReducer;
