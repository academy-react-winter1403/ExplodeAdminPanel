// ** Reducers Imports
import auth from "./authentication";
import layout from "./layout";
import navbar from "./navbar";
import appUsers from "./appUsersSlice";
const rootReducer = { navbar, layout, auth, appUsers };

export default rootReducer;
