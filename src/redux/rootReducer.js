// ** Reducers Imports
import auth from "./authentication";
import layout from "./layout";
import navbar from "./navbar";
import appUsers from "./appUsersSlice"
import courses from "./coursesSlice"
import addCourse from "./addCourseSlice"
import courseDetails from "./courseDetailSlice"
import editCourse from "./editCourse"
const rootReducer = { navbar, layout, auth, appUsers, courses, addCourse, courseDetails, editCourse };

export default rootReducer;
