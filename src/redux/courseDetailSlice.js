import { createSlice } from "@reduxjs/toolkit";

export const courseDetailSlice = createSlice({
    name: 'courseDetails',
    initialState: {
        courseGroups: [],
        courseActiveStatus: null,
        courseReserveList: [],
        coursePaymentsDone: [],
        coursePaymentsNotDone: [],
        coursePaymentListNotAccept: []
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
    }
})
export const {
    setCourseGroups,
    setCourseStatus,
    setCourseReserveList,
    setCoursePayments,
    setCoursePaymentsDone,
    setCoursePaymentsNotDone,
    setCoursePaymentListNotAccept
} = courseDetailSlice.actions
export default courseDetailSlice.reducer;