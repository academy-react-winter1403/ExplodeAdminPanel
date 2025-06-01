import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseComments, getNotAcceptedComments } from './../@core/services/courses';
import { getBlogsComments, getBlogsList, getBlogsReplies } from "../@core/services/blogs";

export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async (_, thunkAPI) => {

        const state = thunkAPI.getState().blogs;
        const { news, totalCount } = await getBlogsList({
            PageNumber: state.currentPageBlog,
            RowsOfPage: state.rowsOfPage !== null || state.rowsOfPage !== '' ? state.rowsOfPage : 10,
            Query: state.blogQuery ? state.blogQuery : null,
            SortType: 'DESC',
            SortingCol: 'insertDate',
            IsActive: state.blogsStatus
        })
        return { news, totalCount }
    }
)



export const fetchBlogCommentReplies = createAsyncThunk(
    "blogs/fetchBlogCommentReplies",

    async (_, thunkAPI) => {
        console.log('response')
        const state = thunkAPI.getState().blogs;
        const response = await getBlogsReplies(state.commentId);
        const commentId = state.commentId
        return { commentId, replies: response };
    }
);

export const fetchBlogComments = createAsyncThunk(
    "blogs/fetchBlogComments",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().blogs;
        const result = await getBlogsComments(state.blogId)
        return result
    }
)


export const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        blogsStatus: true,
        activeTotalCount: 0,
        currentPageBlog: 1,
        blogId: null,
        blogQuery: null,
        commentId: null,
        comments: [],
        allComments: [],
        blogRowsOfPage: 10,
        activeCourses: 0,
        notActiveCourses: 0,
    },
    reducers: {
        setBlogsCurrentPage: (state, action) => {
            state.currentPageBlog = action.payload
        },
        setBlogQuery: (state, action) => {
            state.blogQuery = action.payload
        },
        setBlogStatus: (state, action) => {
            state.blogsStatus = action.payload
        },
        setBlogId: (state, action) => {
            state.blogId = action.payload
        },
        setBlogCommentId: (state, action) => {
            state.commentId = action.payload
        },
        setComments: (state, action) => {
            const { comment_Id } = action.payload
            state.comments = state.comments.filter((c) => c.id !== comment_Id)
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogCommentReplies.fulfilled, (state, action) => {
                const { commentId, replies } = action.payload;
                console.log(commentId)
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

            .addCase(fetchBlogComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.allComments = action.payload.map((comment) => ({
                    ...comment,
                    replies: []
                }))
            })

            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload.news
                state.activeTotalCount = action.payload.totalCount
            })


    },
});

export const {
    setBlogsCurrentPage,
    setBlogQuery,
    setBlogStatus,
    setBlogId,
    setBlogCommentId
} = blogSlice.actions
export default blogSlice.reducer;