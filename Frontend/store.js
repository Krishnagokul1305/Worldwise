import { configureStore } from "@reduxjs/toolkit";
import Cityreducer from "./CitySlice";
import userReducer from "./userSlice";
const store=configureStore({
    reducer:{
     Cityreducer,
     userReducer
    }
})

export default store