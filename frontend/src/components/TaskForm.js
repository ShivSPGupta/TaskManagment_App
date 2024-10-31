import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const TaskForm = ({ currentTask, onSubmit }) => {
  const [task, setTask] = useState({ 
    name: '', 
    description: '', 
    dueDate: '', 
    status: 'Pending', 
    priority: 'Low',
    comments: '', // Initialize comments
    assignedTo: '', // Added assignedTo
  });

  useEffect(() => {
    if (currentTask) {
      setTask({
        name: currentTask.name,
        description: currentTask.description,
        dueDate: currentTask.dueDate.split('T')[0], // Format date for input
        status: currentTask.status,
        priority: currentTask.priority,
        comments: currentTask.comments.join('\n'), // Show comments in textarea
        assignedTo: currentTask.assignedTo || '', 
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ name: '', description: '', dueDate: '', status: 'Pending', priority: 'Low', assignedTo: '', comments: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h4 className="mb-3">Task Form</h4>
      <div className="mb-3">
        <input 
          className="form-control" 
          name="name" 
          value={task.name} 
          onChange={handleChange} 
          placeholder="Task Name" 
          required 
        />
      </div>
      <div className="mb-3">
        <textarea 
          className="form-control" 
          name="description" 
          value={task.description} 
          onChange={handleChange} 
          placeholder="Description" 
          required 
        />
      </div>
      <div className="mb-3">
        <input 
          type="date" 
          className="form-control" 
          name="dueDate" 
          value={task.dueDate} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-3">
        <select 
          className="form-select" 
          name="status" 
          value={task.status} 
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-3">
        <select 
          className="form-select" 
          name="priority" 
          value={task.priority} 
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          name="assignedTo" 
          value={task.assignedTo} 
          onChange={handleChange} 
          placeholder="Assign to (username)" 
          required 
        />
      </div>
      <div className="mb-3">
        <textarea 
          className="form-control" 
          name="comments" 
          value={task.comments} 
          onChange={handleChange} 
          placeholder="Add comments..." 
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {currentTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
