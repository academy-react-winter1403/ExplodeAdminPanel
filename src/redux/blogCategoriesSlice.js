import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories, getNewsById } from "../@core/services/blogs";


export const fetchCategories = createAsyncThunk(
    "blogCategories/fetchCategories",
    async () => {
        const result = await getCategories()
        return result
    }
)

export const fetchBlogData = createAsyncThunk(
    "blogCategories/fetchBlogData",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().blogCategories;
        const { detailsNewsDto } = await getNewsById(state.blogId)
        return { detailsNewsDto }
    }
)


export const categorySlice = createSlice({
    name: "blogCategories",
    initialState: {
        categories: [],
        newBlogData: {},
        blogImage: null,
        blogId: null,
        blogData: null
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setBlogData: (state, action) => {
            state.newBlogData = action.payload
        },
        setBlogImage: (state, action) => {
            state.blogImage = action.payload
        },
        setBlogEditor: (state, action) => {
            state.blogEditor = action.payload
        },
        setBlogId: (state, action) => {
            state.blogId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })

            .addCase(fetchBlogData.fulfilled, (state, action) => {
                state.blogData = action.payload.detailsNewsDto
            })
    },
});

export const {
    setCategories,
    setBlogData,
    setBlogImage,
    setBlogId
} = categorySlice.actions

export default categorySlice.reducer;