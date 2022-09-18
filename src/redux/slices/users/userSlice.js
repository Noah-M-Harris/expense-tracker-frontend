import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import usersBaseURL from '../../../utils/baseURL'



// Login Action
export const loginUserAction = createAsyncThunk('user/login', async (payload, {rejectWithValue, getState, dispatch}) => {
    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        // Make HTTP call: Data contains user details
        const {data} = await axios.post(usersBaseURL + '/login', payload, config)

        // save user into localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))

        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// Login Action
export const logoutUserAction = createAsyncThunk('user/logout', async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
        localStorage.removeItem('userInfo')

    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})



// Register Action
export const registerUserAction = createAsyncThunk('user/register', async (payload, {rejectWithValue, getState, dispatch}) => {
    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        // Make HTTP call
        const {data} = await axios.post(usersBaseURL + '/register', payload, config)
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// User Profile
export const userProfileAction = createAsyncThunk('user/profile', async (payload, {rejectWithValue, getState, dispatch}) => {
    // Retrieve user token from store
    const user = getState()?.users?.userAuth?.token

    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user}`
        }
    }
    try {
        // Make HTTP call: Data contains user details
        const {data} = await axios.get(usersBaseURL + '/profile', config)

        // save user into localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))

        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// Update User Profile
export const updateProfileAction = createAsyncThunk('user/update', async (payload, {rejectWithValue, getState, dispatch}) => {
    // Retrieve user token from store
    const user = getState()?.users?.userAuth?.token

    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user}`
        }
    }
    try {
        // Make HTTP call: Data contains user details
        const {data} = await axios.put(usersBaseURL + '/update', 
        {
            firstName: payload?.firstName, 
            lastName: payload?.lastName, 
            email: email?.payload
        }, 
        config
        )

        // save user into localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))

        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// Get user from localStorage and set in store
const userlocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        userAuth: userlocalStorage
    },
    extraReducers: (builder) => {
        // Handle Pending State: Login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true
            state.userAppErr = undefined
            state.userServerErr = undefined
        })
        // Handle Success State: Login
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.isRegistered = true
            state.userLoading = false
            state.userAppErr = undefined
            state.userServerErr = undefined
        })
        // Handle Rejected State: Login
        builder.addCase(loginUserAction.rejected, (state,action) => {
            state.userLoading = false
            state.userAppErr = action?.payload?.message
            state.userServerErr = action?.error?.message
        })
        // Handle Pending State: Register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.userLoading = true
            state.userAppErr = undefined
            state.userServerErr = undefined
        })
        // Handle Success State: Register
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload
            state.userLoading = false
            state.userAppErr = undefined
            state.userServerErr = undefined
        })
        // Handle Rejected State: Register
        builder.addCase(registerUserAction.rejected, (state,action) => {
            state.userLoading = false
            state.userAppErr = action?.payload?.message
            state.userServerErr = action?.error?.message
        })
        // Handle Success State: Logout
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.userAuth = undefined
            state.userLoading = false
        })
        // Handle Pending State: userProfile
        builder.addCase(userProfileAction.pending, (state, action) => {
            state.Loading = true
            state.AppErr = undefined
            state.ServerErr = undefined
        })
        // Handle Success State: userProfile
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.profile = action?.payload
            state.Loading = false
            state.AppErr = undefined
            state.ServerErr = undefined
        })
        // Handle Rejected State: userProfile
        builder.addCase(userProfileAction.rejected, (state,action) => {
            state.Loading = false
            state.AppErr = action?.payload?.message
            state.ServerErr = action?.error?.message
        })
        // Handle Pending State: update Profile
        builder.addCase(updateProfileAction.pending, (state, action) => {
            state.Loading = true
            state.AppErr = undefined
            state.ServerErr = undefined
        })
        // Handle Success State: update Profile
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            state.userUpdate = action?.payload
            state.isEdited = true
            state.Loading = false
            state.AppErr = undefined
            state.ServerErr = undefined
        })
        // Handle Rejected State: update Profile
        builder.addCase(updateProfileAction.rejected, (state,action) => {
            state.Loading = false
            state.AppErr = action?.payload?.message
            state.ServerErr = action?.error?.message
        })

    }
}) 


export default userSlice.reducer