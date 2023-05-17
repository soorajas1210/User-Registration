import { configureStore } from "@reduxjs/toolkit";

import userRegisterReducer from "./Users/userRegisterSlice";
import UserSigninReducer from "./Users/UserSigninSlice";
import getUserInfoReducer from "./Users/getUserInfoSlice";
import userEditReducer from "./Users/userEditSlice";


export const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userSignin: UserSigninReducer,
    userInfo : getUserInfoReducer,
    userEdit : userEditReducer,
  },
});
