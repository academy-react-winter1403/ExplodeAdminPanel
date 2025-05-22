import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseCommentReplies, courseComments, getAllCourses } from './../@core/services/courses';

export const fetchAllCourses = createAsyncThunk(
    "courses/fetchAllCourses",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const { courseDtos, totalCount } = await getAllCourses({
            PageNumber: state.currentPage,
            RowsOfPage: 10
        })
        return { courseDtos, totalCount }
    }
)

export const fetchCourseCommentReplies = createAsyncThunk(
    "courses/fetchCourseCommentReplies",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const result = await courseCommentReplies(state.courseId, state.commentId)
        return result
    }
)

export const fetchCourseComments = createAsyncThunk(
    "courses/fetchCourseComments",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const result = await courseComments(state.courseId)
        return result
    }
)

export const coursesSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        totalCount: 0,
        currentPage: 1,
        loading: false,
        courseId: null,
        commentId: null,
        commentReplies: [],
        comments: []
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
        },
        setCourseId: (state, action) => {
            state.courseId = action.payload
        },
        setCommentId: (state, action) => {
            state.commentId = action.payload
        },
        updateCommentReplies: (state, action) => {
            const { commentId } = action.payload
            state.commentReplies = state.commentReplies.filter((c) => c.id !== commentId)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.courses = action.payload.courseDtos;
                state.totalCount = action.payload.totalCount
            })

            .addCase(fetchCourseCommentReplies.fulfilled, (state, action) => {
                state.commentReplies = action.payload;
            })

            .addCase(fetchCourseComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })

    },
});

export const {
    setCurrentPage,
    updateCourseStatus,
    courseDeleted,
    setCourseId,
    setCommentId,
    updateCommentReplies
} = coursesSlice.actions
export default coursesSlice.reducer;