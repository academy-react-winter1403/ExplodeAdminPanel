import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAssistance } from "../@core/services/courses";

export const fetchAllAssistance = createAsyncThunk(
    "courseDetail/fetchAllAssistance",
    async () => {
        const result = await getAllAssistance()
        return result
    }
)

export const courseDetailSlice = createSlice({
    name: 'courseDetails',
    initialState: {
        courseGroups: [],
        courseActiveStatus: null,
        courseReserveList: [],
        coursePaymentsDone: [],
        coursePaymentsNotDone: [],
        coursePaymentListNotAccept: [],
        courseStatusValue: null,
        courseAssistanceList: []
    },
    reducers: {
        setCourseGroups: (state, action) => {
            state.courseGroups = action.payload
        },
        setCourseStatus: (state, action) => {
            state.courseActiveStatus = action.payload
        },
        setCourseReserveList: (state, action) => {
            state.courseReserveList = action.payload
        },
        setCoursePaymentsDone: (state, action) => {
            state.coursePaymentsDone = action.payload
        },
        setCoursePaymentsNotDone: (state, action) => {
            state.coursePaymentsNotDone = action.payload
        },
        setCoursePaymentListNotAccept: (state, action) => {
            state.coursePaymentListNotAccept = action.payload
        },
        setCourseStatusValue: (state, action) => {
            state.courseStatusValue = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAssistance.fulfilled, (state, action) => {
                state.courseAssistanceList = action.payload
            })
    }
})
export const {
    setCourseGroups,
    setCourseStatus,
    setCourseReserveList,
    setCoursePayments,
    setCoursePaymentsDone,
    setCoursePaymentsNotDone,
    setCoursePaymentListNotAccept,
    setCourseStatusValue
} = courseDetailSlice.actions
export default courseDetailSlice.reducer;