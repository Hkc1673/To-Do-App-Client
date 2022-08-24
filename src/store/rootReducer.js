import {combineReducers} from '@reduxjs/toolkit';
import { toDoSlice } from './slice/toDoSlice';

const rootReducer = combineReducers({
    toDo:toDoSlice.reducer
});

export default rootReducer;