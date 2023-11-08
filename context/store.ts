import {configureStore} from '@reduxjs/toolkit';
import loginReducers from './slice/loginSlice';
import configReducer from "./slice/configurationSlice";
import locationReducer from "./slice/locationSlice";

export const store = configureStore({
    reducer:{login:loginReducers,config:configReducer,location:locationReducer},
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch