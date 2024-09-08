import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,   
    role: null,
    isAuthenticated: false,    
  },
  reducers: {
    logout: (state) => {
      state.email = null;     
      state.role = null;
      state.isAuthenticated = false;  
      localStorage.removeItem('token');    
    },
    setLogin: (state, action) => {
      const { email, role, isAuthenticated} = action.payload;
      state.email = email;     
      state.role = role;
      state.isAuthenticated = isAuthenticated;        
    },
  },
});

export const { logout, setLogin } = authSlice.actions;
