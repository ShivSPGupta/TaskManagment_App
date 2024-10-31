import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{task.name}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="card-text"><strong>Status:</strong> {task.status}</p>
        <p className="card-text"><strong>Priority:</strong> {task.priority}</p>
        <p className="card-text"><strong>Comments:</strong></p>
        <pre className="border p-2">{task.comments.join('\n')}</pre> {/* Display comments */}
        <button className="btn btn-warning me-2" onClick={() => onUpdate(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
