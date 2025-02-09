import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/User"
import userTypeReducer from "../app/UserType";
import themeReducer from '../app/Theme'
import  getNotificationReducer  from "./GetNotification";
const store=configureStore({
	reducer:{
		user:userReducer,
		userType:userTypeReducer,
		theme:themeReducer,
		getNotification:getNotificationReducer
	}
})

export default store