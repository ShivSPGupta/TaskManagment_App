import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    priority: '',
    dueDate: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
      setFilteredTasks(res.data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdateTask = async (task) => {
    if (currentTask) {
      await axios.put(`http://localhost:5000/api/tasks/${currentTask._id}`, task);
    } else {
      await axios.post('http://localhost:5000/api/tasks', task);
    }
    setCurrentTask(null);
    fetchTasks();
  };

  const handleUpdateTask = (task) => {
    setCurrentTask(task);
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const applyFilters = () => {
    let filtered = tasks;

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

    setFilteredTasks(filtered);
  };

  return (
    <div className="container mt-4">
      {/* <h2 className="text-center mb-4">Task Management</h2> */}
      <TaskForm currentTask={currentTask} onSubmit={handleCreateOrUpdateTask} />

      <div className="mb-4">
        <h3>Search Tasks</h3>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Search by name or description..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={applyFilters}>Search</button>
      </div>

      <div className="mb-4">
        <h3>Filter Tasks</h3>
        <select name="status" className="form-select mb-2" value={filterCriteria.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select name="priority" className="form-select mb-2" value={filterCriteria.priority} onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          className="form-control mb-2"
          value={filterCriteria.dueDate}
          onChange={handleFilterChange}
        />

        <button className="btn btn-secondary" onClick={applyFilters}>Apply Filters</button>
      </div>

      <div>
        {filteredTasks.map(task => (
          <TaskItem key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
