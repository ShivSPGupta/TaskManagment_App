import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:5000/api/tasks');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await axios.post('http://localhost:5000/api/tasks', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filteredTasks: [],
    currentTask: null,
  },
  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
    clearCurrentTask(state) {
      state.currentTask = null;
    },
    applyFilters(state, action) {
      const { filterCriteria, searchQuery } = action.payload;
      let filtered = state.tasks;

      if (filterCriteria.status) {
        filtered = filtered.filter(task => task.status === filterCriteria.status);
      }

      if (filterCriteria.priority) {
        filtered = filtered.filter(task => task.priority === filterCriteria.priority);
      }

      if (filterCriteria.dueDate) {
        filtered = filtered.filter(task => new Date(task.dueDate).toLocaleDateString() === new Date(filterCriteria.dueDate).toLocaleDateString());
      }

      if (searchQuery) {
        filtered = filtered.filter(task => 
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      state.filteredTasks = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.filteredTasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export const { setCurrentTask, clearCurrentTask, applyFilters } = tasksSlice.actions;

export default tasksSlice.reducer;
