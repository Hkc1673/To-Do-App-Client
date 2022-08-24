import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toDoServices from "../../services/toDo.services"

export const getToDoList = createAsyncThunk(
    'getToDoList',
    async (body, { rejectWithValue }) => {
        try {
            return await toDoServices.getAllToDos();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const createToDo = createAsyncThunk(
    'createToDo',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await toDoServices.createToDo(data);
            dispatch(getToDoList());
            return  response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const updateToDo = createAsyncThunk(
    'updateToDo',
    async (data, { dispatch ,rejectWithValue }) => {
        try {
            const response = await toDoServices.updateToDo(data);
            dispatch(getToDoList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const deleteToDo = createAsyncThunk(
    'deleteToDo',
    async ({id}, { dispatch, rejectWithValue }) => {
        try {
            const response = await toDoServices.deleteToDo({id});
            dispatch(getToDoList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const changeStatusToDo = createAsyncThunk(
    'changeStatusToDo',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await toDoServices.changeStatusToDo(data);
            dispatch(getToDoList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);


const initialState = {
    toDos: [],
    selectedCategory: [],
    category:"All",
    isLoading: false
};

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload?.categoryList;
            state.category = action.payload?.categoryName
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getToDoList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getToDoList.fulfilled, (state, action) => {
            state.toDos = action?.payload?.data
            state.selectedCategory= state.category === "All" ? state.toDos : state.toDos.filter(todo => todo.category === state.category);
            state.isLoading = false
        });
        builder.addCase(getToDoList.rejected, (state, action) => {
            state.isLoading = false
        });
    }
});

export const { selectCategory } = toDoSlice.actions;