import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});
export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
  const { data } = await axios.get('/posts-popular');
  return data;
});
export const fetchNewsPosts = createAsyncThunk('posts/fetchNewsPosts', async () => {
  const { data } = await axios.get('/posts-news');
  return data;
});
export const fetchPostRemove = createAsyncThunk('posts/fetchPostRemove',async (_id) => {
  console.log(_id)
  await axios.delete(`/posts/${_id}`)
 
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
const initialState = {
  posts: {
    items: [],
    status: 'pending',
  },
  tags: {
    items: [],
    status: 'pending',
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'pending';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'fulfilled';
      state.posts.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.posts.status = 'rejected';
      state.posts.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = 'pending';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'fulfilled';
      state.tags.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.tags.status = 'rejected';
      state.tags.items = [];
    },
    [fetchPostRemove.pending]: (state,action) => {
      state.tags.status = 'pending';
      state.posts.items =  state.posts.items.filter(item => item._id !== action.meta.arg)
    },
    [fetchPopularPosts.pending]: (state) => {
      state.posts.status = 'pending';
      state.posts.items = [];
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.status = 'fulfilled';
      state.posts.items = action.payload;
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.posts.status = 'rejected';
      state.posts.items = [];
    },
    [fetchNewsPosts.pending]: (state) => {
      state.posts.status = 'pending';
      state.posts.items = [];
    },
    [fetchNewsPosts.fulfilled]: (state, action) => {
      state.posts.status = 'fulfilled';
      state.posts.items = action.payload;
    },
    [fetchNewsPosts.rejected]: (state) => {
      state.posts.status = 'rejected';
      state.posts.items = [];
    },
  },
});

export default postsSlice.reducer;
