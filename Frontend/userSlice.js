import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  islogged: false,
  user: {
    email: "",
    password: "",
    avatar:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
  error: "",
};

const USER = {
  email: "gokul@email.com",
  password: "1234",
};
const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.islogged = false;
      state.user.email = "";
      state.user.password = "";
    },
    login(state, action) {
      console.log(action.payload)
      if (
        USER.email === action.payload.email
      ) {
        state.islogged = true;
        state.user.email = USER.email;
        state.user.password = USER.password;
        state.error = "";
      } else {
        state.error = "wrong credentials";
      }
    },
  },
});
export const { login, logout } = useSlice.actions;
export default useSlice.reducer;
