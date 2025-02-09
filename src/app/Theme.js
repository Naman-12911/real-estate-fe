import { createSlice } from "@reduxjs/toolkit";


const initialState={
	theme: localStorage.getItem('theme'),
}
const themeSlice=createSlice({
	name:'theme',
	initialState,
	reducers:{
		themeToggle:(state,actions)=>{
			state.theme=actions.payload;
			localStorage.setItem('theme',state.theme)
		},
	}
})

export const {themeToggle}=themeSlice.actions
export default themeSlice.reducer