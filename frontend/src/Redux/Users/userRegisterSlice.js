import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  smessage: null,
  error: null,
  registered: false,
};

const userRegisterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterReq: (state, action) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.smessage = "Registered Successfully";
      state.registered = true;
    },
    userRegistered: (state, action) => {
      state.registered = false;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
 userRegisterFail,userRegisterReq,userRegisterSuccess,userRegistered
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
