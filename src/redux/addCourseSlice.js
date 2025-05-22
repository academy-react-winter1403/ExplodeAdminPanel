import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourseInfoForCreate } from "../@core/services/courses";

export const fetchCourseInfo = createAsyncThunk(
    "addCourse/fetchCourseInfo",
    async () => {
        const { courseTypeDtos, termDtos, classRoomDtos, courseLevelDtos, teachers } = await getCourseInfoForCreate()
        return { courseTypeDtos, termDtos, classRoomDtos, courseLevelDtos, teachers }
    }
)

export const addCourseSlice = createSlice({
    name: "addCourse",
    initialState: {
        courseTypes: [],
        courseTerms: [],
        courseClassRooms: [],
        courseLevels: [],
        courseTeachers: [],
        courseType: null,
        courseTerm: null,
        courseClassRoom: null,
        courseLevel: null,
        courseTeacher: null
    },
    reducers: {
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseInfo.fulfilled, (state, action) => {
                state.courseTypes = action.payload.courseTypeDtos.map((type)=>({value:type.id,label:type.typeName}));
                state.courseTerms = action.payload.termDtos.map((term)=>({value:term.id,label:term.termName}));
                state.courseClassRooms = action.payload.classRoomDtos.map((classRoom)=>({value:classRoom.id,label:classRoom.classRoomName}));
                state.courseLevels = action.payload.courseLevelDtos.map((courseLevel)=>({value:courseLevel.id,label:courseLevel.levelName}));
                state.courseTeachers = action.payload.teachers.map((teacher)=>({value:teacher.id,label:teacher.fullName}));
            })
    },
});

export const {
    setCourseType,
    setCourseTerm,
    setCourseClassRoom,
    setCourseLevel,
    setCourseTeacher
} = addCourseSlice.actions

export default addCourseSlice.reducer;