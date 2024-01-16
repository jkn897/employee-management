import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};
export default function (state = initialState, action) {
  // console.log('initialState : ' + JSON.stringify(initialState));
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      // console.log('SET_MESSAGE : ' + SET_MESSAGE);
      return { message: payload };

    case CLEAR_MESSAGE:
      // console.log('CLEAR_MESSAGE : ' + CLEAR_MESSAGE);
      return { message: "" };

    default:
      // console.log('DEFAULT_MESSAGE : ');
      return state;
  }
}
