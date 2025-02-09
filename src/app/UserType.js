import { createSlice } from "@reduxjs/toolkit";


const initialState={
	userType: [],
}
const userTypeSlice=createSlice({
	name:'userType',
	initialState,
	reducers:{
		userTypePush:(state,actions)=>{
			state.userType=actions.payload || localStorage.getItem('user_type');
		}
	}
})

export const {userTypePush}=userTypeSlice.actions
export default userTypeSlice.reducer