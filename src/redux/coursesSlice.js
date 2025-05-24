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

    },
});

export const {
    setCurrentPage,
    updateCourseStatus,
    courseDeleted,
    setCourseId,
    setCommentId,
    updateCommentReplies,
    setDeleteCommentReply,
} = coursesSlice.actions
export default coursesSlice.reducer;