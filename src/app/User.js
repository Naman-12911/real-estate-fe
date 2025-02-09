import { createSlice } from "@reduxjs/toolkit";


const initialState={
	user: null,
	userProfile:{}
}
const userSlice=createSlice({
	name:'user',
	initialState,
	reducers:{
		userLogin:(state,actions)=>{
			state.user=actions.payload || localStorage.getItem('access_token');
		},
		userLogout:(state)=>{
			state.user=null;
			state.userProfile={};
			localStorage.clear();
		},
		loadUserProfile:(state,actions)=>{
			state.userProfile=actions.payload;
			
		}
	}
})

export const {userLogin,userLogout,loadUserProfile}=userSlice.actions
export default userSlice.reducer