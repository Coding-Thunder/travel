import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  user: {
    email: string
    name: string
  } | null
  isAdmin: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string; isAdmin?: boolean }>) => {
      state.isAuthenticated = true
      state.user = { email: action.payload.email, name: action.payload.name }
      state.isAdmin = action.payload.isAdmin || false
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.isAdmin = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
