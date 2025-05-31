import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateCourseInfo } from "../@core/services/courses";


export const fetchEditCourse = createAsyncThunk(
    "editCourse/fetchEditCourse",
    async (setLoading, thunkAPI) => {
        const state = thunkAPI.getState().editCourse;
        const formData = new FormData()
        formData.append('Id', state.courseId)
        formData.append('Title', state.courseTitle)
        formData.append('Describe', state.courseDescribe)
        formData.append('MiniDescribe', state.courseMiniDescribe)
        formData.append('Capacity', state.courseCapacity)
        formData.append('CourseTypeId', state.courseType)
        formData.append('SessionNumber', state.courseSessionNumber)
        formData.append('TremId', state.courseTerm)
        formData.append('ClassId', state.courseClassRoom)
        formData.append('CourseLvlId', state.courseLevel)
        formData.append('TeacherId', state.courseTeacher)
        formData.append('Cost', state.courseCost)
        formData.append('UniqeUrlString', state.courseUUID)
        formData.append('StartTime', state.courseStartTime)
        formData.append('EndTime', state.courseEndTime)
        formData.append('Image', state.courseImage)
        const { id } = await updateCourseInfo(formData, setLoading)
        return { id }
    }
)

const editCourseSlice = createSlice({
    name: 'editCourse',
    initialState: {
        basicInfo: [],
        courseType: null,
        courseTerm: null,
        courseClassRoom: null,
        courseLevel: null,
        courseTeacher: null,
        courseTitle: '',
        courseDescribe: '',
        courseMiniDescribe: '',
        courseCapacity: null,
        courseSessionNumber: null,
        courseCost: null,
        courseStartTime: '',
        courseEndTime: '',
        courseImage: false,
        courseId: null,
        courseUUID: null
    },
    reducers: {
        setBasicInfo: (state, action) => {
            state.basicInfo = action.payload
        },
        setCourseType: (state, action) => {
            state.courseType = action.payload;
        },
        setCourseTerm: (state, action) => {
            state.courseTerm = action.payload;
        },
        setCourseClassRoom: (state, action) => {
            state.courseClassRoom = action.payload;
        },
        setCourseLevel: (state, action) => {
            state.courseLevel = action.payload;
        },
        setCourseTeacher: (state, action) => {
            state.courseTeacher = action.payload;
        },
        setCourseTitle: (state, action) => {
            state.courseTitle = action.payload;
        },
        setCourseDescribe: (state, action) => {
            state.courseDescribe = action.payload;
        },
        setCourseMiniDescribe: (state, action) => {
            state.courseMiniDescribe = action.payload;
        },
        setCourseSessionNumber: (state, action) => {
            state.courseSessionNumber = action.payload;
        },
        setCourseCost: (state, action) => {
            state.courseCost = action.payload;
        },
        setCourseStartTime: (state, action) => {
            state.courseStartTime = action.payload;
        },
        setCourseEndTime: (state, action) => {
            state.courseEndTime = action.payload;
        },
        setCourseImage: (state, action) => {
            state.courseImage = action.payload;
        },
        setCourseId: (state, action) => {
            state.courseId = action.payload;
        },
        setCourseCapacity: (state, action) => {
            state.courseCapacity = action.payload;
        },
        setCourseUUID: (state, action) => {
            state.courseUUID = action.payload;
        },
    }
})

export const {
    setBasicInfo,
    setCourseType,
    setCourseTerm,
    setCourseClassRoom,
    setCourseLevel,
    setCourseTeacher,
    setCourseTitle,
    setCourseDescribe,
    setCourseMiniDescribe,
    setCourseSessionNumber,
    setCourseCost,
    setCourseStartTime,
    setCourseEndTime,
    setCourseImage,
    setCourseId,
    setCourseCapacity,
    setCourseUUID
} = editCourseSlice.actions
export default editCourseSlice.reducer