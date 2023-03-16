import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchUserData = createAsyncThunk('posts/fetchAuth', async (params) => {
    const {data} = await axios.post("/auth/login",params)
    return data
})
export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
    const {data} = await axios.post("/auth/me")
    return data
})
export const fetchRegister = createAsyncThunk('posts/fetchRegister', async (params) => {
    const {data} = await axios.post("/auth/register", params)
    return data
})

const initialState = {
    data: null,
    status: "loading"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state)=> {
        state.data = null
    }
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
        state.status = 'loading'
        state.data = null
    },
    [fetchUserData.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        state.data = action.payload
    },
    [fetchUserData.rejected]: (state) => {
        state.status = 'rejected'
        state.data = null
    },
    [fetchAuthMe.pending]: (state) => {
        state.status = 'loading'
        state.data = null
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        state.data = action.payload
    },
    [fetchAuthMe.rejected]: (state) => {
        state.status = 'rejected'
        state.data = null
    },
    [fetchRegister.pending]: (state) => {
        state.status = 'loading'
        state.data = null
    },
    [fetchRegister.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        state.data = action.payload
    },
    [fetchRegister.rejected]: (state) => {
        state.status = 'rejected'
        state.data = null
    },
  }

})
export const {logout} = authSlice.actions
export default authSlice.reducer