import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export actions for use in components
export const { setTasks, addTask, updateTask, deleteTask, setLoading } = tasksSlice.actions;

// Export the reducer to be used in the store
export default tasksSlice.reducer;
