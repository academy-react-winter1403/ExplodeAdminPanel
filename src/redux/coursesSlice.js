import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseCommentReplies, courseComments, getAllCourses, getBuildings, getClassRooms, getCourseLevels, getNotAcceptedComments } from './../@core/services/courses';

export const fetchAllCourses = createAsyncThunk(
    "courses/fetchAllCourses",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const { courseDtos, totalCount } = await getAllCourses({
            PageNumber: state.currentPage,
            RowsOfPage: state.rowsOfPage !== null || state.rowsOfPage !== '' ? state.rowsOfPage : 10,
            Query: state.query,
            SortType: 'DESC',
            SortingCol: 'lastUpdate'
        })
        return { courseDtos, totalCount }
    }
)


export const fetchCoursesListData = createAsyncThunk(
    "courses/fetchCoursesListData",
    async () => {
        const { courseDtos, totalCount } = await getAllCourses({
            RowsOfPage: 20000
        })
        return { courseDtos, totalCount }
    }
)



export const fetchCourseCommentReplies = createAsyncThunk(
    "courses/fetchCourseCommentReplies",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const response = await courseCommentReplies(state.courseId, state.commentId);
        const commentId = state.commentId
        return { commentId, replies: response };
    }
);

export const fetchCourseComments = createAsyncThunk(
    "courses/fetchCourseComments",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().courses;
        const result = await courseComments(state.courseId)
        return result
    }
)

export const fetchCourseNotAcceptedComments = createAsyncThunk(
    "courses/fetchCourseNotAcceptedComments",
    async () => {
        const { comments } = await getNotAcceptedComments({
            RowsOfPage: 20000,
            SortType: 'insertDate',
            Accept: 'false'
        })
        return { comments }
    }
)

export const fetchBuldings = createAsyncThunk(
    "courses/fetchBuldings",
    async () => {
        const result = await getBuildings()
        return result
    }
)


export const fetchClassRooms = createAsyncThunk(
    "courses/fetchClassRooms",
    async () => {
        const result = await getClassRooms()
        return result
    }
)

export const fetchCourseLevels = createAsyncThunk(
    "courses/fetchCourseLevels",
    async () => {
        const result = await getCourseLevels()
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
        comments: [],
        allComments: [],
        notAcceptedComments: [],
        notAcceptedMains: [],
        notAcceptedReplies: [],
        rowsOfPage: 10,
        activeCourses: 0,
        notActiveCourses: 0,
        deletedCourses: 0,
        allCoursesCount: 0,
        activeBuildings: [],
        notActiveBuildings: [],
        classRoomsList: [],
        courseLevelsList: []
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
        setClassRooms: (state, action) => {
            state.classRoomsList = action.payload;
        },
        setCourseLevels: (state, action) => {
            state.courseLevelsList = action.payload;
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
        updateComments: (state, action) => {
            const { commentId } = action.payload
            state.comments = state.comments.filter((c) => c.id !== commentId)
        }
        ,
        setDeleteCommentReply: (state, action) => {
            const { commentId } = action.payload;

            const removeReply = (comments, replyId) => {
                return comments.map((comment) => {
                    if (comment.replies?.length > 0) {
                        const newReplies = comment.replies.filter((reply) => reply.id !== replyId);
                        return {
                            ...comment,
                            acceptReplysCount:
                                typeof comment.acceptReplysCount === 'number'
                                    ? Math.max(0, comment.acceptReplysCount - (comment.replies.length - newReplies.length))
                                    : newReplies.length,
                            replies: removeReply(newReplies, replyId),
                        };
                    }
                    return comment;
                });
            };

            state.allComments = removeReply(state.allComments, commentId);
        },
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setNotAcceptedReplies: (state, action) => {
            state.notAcceptedReplies = action.payload
        },
        setNotAcceptedMain: (state, action) => {
            state.notAcceptedMains = action.payload
        },

        setComments: (state, action) => {
            const { comment_Id } = action.payload
            state.comments = state.comments.filter((c) => c.id !== comment_Id)
        },
        setRowsOfPage: (state, action) => {
            state.rowsOfPage = action.payload
        },
        setActiveBuildings: (state, action) => {
            state.activeBuildings = action.payload
        },
        setNotActiveBuildings: (state, action) => {
            state.notActiveBuildings = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.courses = action.payload.courseDtos;
                state.totalCount = action.payload.totalCount
            })

            .addCase(fetchCourseCommentReplies.fulfilled, (state, action) => {
                const { commentId, replies } = action.payload;

                const addReplies = (comments, parentId, newReplies) => {
                    return comments.map((comment) => {
                        if (comment.id === parentId) {
                            return {
                                ...comment,
                                replies: newReplies.map((reply) => ({
                                    ...reply,
                                    replies: [],
                                })),
                            };
                        }
                        if (comment.replies.length > 0) {
                            return {
                                ...comment,
                                replies: addReplies(comment.replies, parentId, newReplies),
                            };
                        }
                        return comment
                    })
                }

                state.allComments = addReplies(state.allComments, commentId, replies);
            })

            .addCase(fetchCourseComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.allComments = action.payload.map((comment) => ({
                    ...comment,
                    replies: []
                }))
            })

            .addCase(fetchCourseNotAcceptedComments.fulfilled, (state, action) => {
                state.notAcceptedComments = action.payload.comments;
                state.notAcceptedMains = action.payload.comments.filter((c) => c.courseId === state.courseId && c.replyCommentId == null)
                state.notAcceptedReplies = action.payload.comments.filter((c) => c.courseId === state.courseId && c.replyCommentId !== null)
            })

            .addCase(fetchCoursesListData.fulfilled, (state, action) => {
                state.activeCourses = action.payload.courseDtos.filter((c) => c.isActive == true && c.isdelete == false).length;
                state.notActiveCourses = action.payload.courseDtos.filter((c) => c.isActive == false && c.isdelete == false).length;
                state.deletedCourses = action.payload.courseDtos.filter((c) => c.isdelete == true).length;
                state.allCoursesCount = action.payload.totalCount
            })
            .addCase(fetchBuldings.fulfilled, (state, action) => {
                state.activeBuildings = action.payload.filter((b) => b.active == true)
                state.notActiveBuildings = action.payload.filter((b) => b.active == false)
            })
            .addCase(fetchClassRooms.fulfilled, (state, action) => {
                state.classRoomsList = action.payload
            })
            .addCase(fetchCourseLevels.fulfilled, (state, action) => {
                state.courseLevelsList = action.payload
            })
    },
});

export const {
    setCurrentPage,
    updateCourseStatus,
    courseDeleted,
    setCourseId,
    setCommentId,
    updateComments,
    setDeleteCommentReply,
    setQuery,
    setNotAcceptedReplies,
    setNotAcceptedMain,
    setComments,
    setRowsOfPage,
    setActiveBuildings,
    setNotActiveBuildings,
    setClassRooms,
    setCourseLevels,
} = coursesSlice.actions
export default coursesSlice.reducer;