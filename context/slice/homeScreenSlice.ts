import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface HomeScreenState {
    popular: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    popular:[],
    topRated:[],
    upComming:[],
    genres:[],
    region:"US",
    loading: 'idle'
} as HomeScreenState

// const fetchPopularMovies = createAsyncThunk<Object,Number>()