import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HomeScreenState {
    countryCode:string,
    
}

const initialState = {
    countryCode: "us"   //await fetchLocation(),    
} as HomeScreenState


export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        saveCountryCode:(state:HomeScreenState,action)=>{
            console.log(action.payload)
            return {countryCode:action.payload.countryCode}
        }
    },
  })
  

export const {saveCountryCode} = locationSlice.actions

export const getCountryCode = (state:RootState)=> state.location.countryCode


export default locationSlice.reducer