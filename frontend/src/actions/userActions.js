import axios from "axios";
import {
  userRegisterFail,
  userRegisterReq,
  userRegisterSuccess,
} from "../Redux/Users/userRegisterSlice";
import { BASE_URL } from "./helper";
import { userLoginFail, userLoginReq, userLoginSuccess } from "../Redux/Users/UserSigninSlice";
import { getUserInfoFail, getUserInfoSuccess } from "../Redux/Users/getUserInfoSlice";
import { userEditFail, userEditSuccess } from "../Redux/Users/userEditSlice";

export const register =
  (
    profileImage,
    firstName,
    lastName,
    email,
    mobileno,
    password,
    country,
    streetAddress,
    city,
    state,
    pin
  ) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(userRegisterReq());

      const { data } = await axios.post(
        `${BASE_URL}/api/users/register`,
        {
          profileImage,
          firstName,
          lastName,
          email,
          mobileno,
          password,
          country,
          streetAddress,
          city,
          state,
          pin,
        },
        config
      );

      dispatch(userRegisterSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userRegisterFail(errorIs));
    }
  };


  
export const signin = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

console.log(email)
    const { data } = await axios.post(
      `${BASE_URL}/api/users/signin`,
      {
        email,
        password,
      },
      config
    );

    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};


export const userDetails = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("hello")

    const { data } = await axios.get(
      `${BASE_URL}/api/users/getUserInfo`,
      config
    );

    dispatch(getUserInfoSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getUserInfoFail(message));
  }
};

export const editUser = (editData) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const data = await axios.patch(
      `${BASE_URL}/api/users/editUser`,
      { editData },
      config
    );
    dispatch(userEditSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message);
    dispatch(userEditFail(message));
  }
};