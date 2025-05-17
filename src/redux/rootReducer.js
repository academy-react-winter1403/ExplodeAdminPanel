// ** Reducers Imports
import auth from "./authentication";
import layout from "./layout";
import navbar from "./navbar";
import appUsers from "./appUsersSlice";
import courses from "./coursesSlice"
const rootReducer = { navbar, layout, auth, appUsers, courses };

export default rootReducer;
