import { createSlice } from "@reduxjs/toolkit";


const initialState={
	getNotification: false,
}
const getNotificationSlice=createSlice({
	name:'getNotification',
	initialState,
	reducers:{
		getNotificationPush:(state,actions)=>{
			state.getNotification=!state.getNotification;
		}
	}
})

export const {getNotificationPush}=getNotificationSlice.actions
export default getNotificationSlice.reducer