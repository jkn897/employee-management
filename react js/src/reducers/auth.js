import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
// console.log('user : ' + user);
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case REGISTER_SUCCESS:
      console.log('register_success case');
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      console.log('register_fail case');
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      console.log('login_success case');
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      console.log('login_fail case');
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      console.log('logout case');
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      // console.log('default case');
      return state;
  }
}
