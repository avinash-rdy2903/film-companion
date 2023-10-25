import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type loginState = {
    isLoggedIn:boolean,
    token:string,
    email:string
}
const initialState:loginState = {
    isLoggedIn:false,
    token:"",
    email:""
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        saveToken: (state:loginState,action)=>{
            console.log(action)
            const userAuth:loginState = {
                isLoggedIn:action.payload.isLoggedIn,
                token:action.payload.token,
                email:action.payload.email
            }
            return userAuth
        },
        deleteToken: (state:loginState,action)=>{
            return {token:"",isLoggedIn:false,email:""}
        }
    }
})

export const {saveToken,deleteToken} = loginSlice.actions

export const getIsLoggedIn = (state:RootState)=> state.login.isLoggedIn
export const getToken  =(state:RootState)=> state.login.token
export const getEmail = (state:RootState) => state.login.email

export default loginSlice.reducer
