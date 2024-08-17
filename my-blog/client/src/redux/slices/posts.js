import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../axios'

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const { data } = await axios.get("/posts")
	return data;
})

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
	const { data } = await axios.get("/tags")
	return data;
})
export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => {
	axios.delete(`/posts/${id}`)
})

const initialState = {
	posts: {
		item: [],
		status: "loading"
	},
	tags: {
		Item: [],
		status: "loading"
	},
}

const postsSlices = createSlice({
	name: "posts",
	initialState,
	reducer: {},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.item = [];
			state.posts.status = 'error'
		},

		// _______________________________

		[fetchTags.pending]: (state) => {
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: (state) => {
			state.tags.item = [];
			state.tags.status = 'error'
		},
		// _______________________________
		[fetchRemovePost.pending]: (state,action) => {
			state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
		}
	}

})

export const postsReducer = postsSlices.reducer