import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../models";

const initialTodoState: Todo[] = [];

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push({
        ...action.payload,
      });
    },

    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    completedTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, completedTodo } = todoSlice.actions;
export default todoSlice.reducer;
