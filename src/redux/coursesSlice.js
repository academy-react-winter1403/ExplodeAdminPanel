import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourses } from './../@core/services/courses';

export const fetchAllCourses = createAsyncThunk(
    "courses/fetchAllCourses",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const { courseDtos, totalCount } = await getAllCourses({
            PageNumber: state.currentPage,
            RowsOfPage:10
        })
        return { courseDtos, totalCount }
    }
)

export const coursesSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        totalCount: 0,
        currentPage: 1,
        loading: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        updateCourseStatus: (state, action) => {
            const { id, status } = action.payload
            const course = state.courses.find(c => c.courseId === id)
            course.isActive = status
        },
        courseDeleted: (state, action) => {
            const { id } = action.payload
            const course = state.courses.find(c => c.courseId === id)
            course.isdelete = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.courses = action.payload.courseDtos;
                state.totalCount = action.payload.totalCount
            })

    },
});

export const { setCurrentPage, updateCourseStatus,courseDeleted } = coursesSlice.actions
export default coursesSlice.reducer;