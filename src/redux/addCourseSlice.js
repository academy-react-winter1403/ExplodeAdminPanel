import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewCourse, getCourseInfoForCreate } from "../@core/services/courses";

export const fetchCourseInfo = createAsyncThunk(
    "addCourse/fetchCourseInfo",
    async () => {
        const { courseTypeDtos, termDtos, classRoomDtos, courseLevelDtos, teachers, technologyDtos } = await getCourseInfoForCreate()
        return { courseTypeDtos, termDtos, classRoomDtos, courseLevelDtos, teachers, technologyDtos }
    }
)

export const fetchAddCourse = createAsyncThunk(
    "addCourse/fetchAddCourse",
    async (setLoading, thunkAPI) => {
        const state = thunkAPI.getState().addCourse;
        const formData = new FormData()
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
        formData.append('TumbImageAddress', state.courseThumbnail)
        formData.append('Image', state.courseImage)
        const { id } = await addNewCourse(formData, setLoading)
        return { id }
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
        courseTechnologies: [],
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
        courseUUID: null,
        courseImage: false,
        courseThumbnail: false,
        courseId: null,
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
        setCourseUUID: (state, action) => {
            state.courseUUID = action.payload;
        },
        setCourseImage: (state, action) => {
            state.courseImage = action.payload;
        },
        setCourseThumbnail: (state, action) => {
            state.courseThumbnail = action.payload;
        },
        setCourseId: (state, action) => {
            state.courseId = action.payload;
        },
        setCourseCapacity: (state, action) => {
            state.courseCapacity = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseInfo.fulfilled, (state, action) => {
                state.courseTypes = action.payload.courseTypeDtos.map((type) => ({ value: type.id, label: type.typeName }));
                state.courseTerms = action.payload.termDtos.map((term) => ({ value: term.id, label: term.termName }));
                state.courseClassRooms = action.payload.classRoomDtos.map((classRoom) => ({ value: classRoom.id, label: classRoom.classRoomName }));
                state.courseLevels = action.payload.courseLevelDtos.map((courseLevel) => ({ value: courseLevel.id, label: courseLevel.levelName }));
                state.courseTeachers = action.payload.teachers.map((teacher) => ({ value: teacher.teacherId, label: teacher.fullName }));
                state.courseTechnologies = action.payload.technologyDtos.map((technology) => ({ value: technology.id, label: technology.techName }));
            })

            .addCase(fetchAddCourse.fulfilled, (state, action) => {
                state.courseId = action.payload.id
            })
    },
});

export const {
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
    setCourseUUID,
    setCourseImage,
    setCourseThumbnail,
    setCourseId,
    setCourseCapacity,
} = addCourseSlice.actions

export default addCourseSlice.reducer;