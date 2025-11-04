import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority
  });

  const handleSave = () => {
    onUpdate(todo._id, editedTodo);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const priorityColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336'
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
          placeholder="할일 제목"
        />
        <textarea
          value={editedTodo.description}
          onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
          placeholder="설명"
        />
        <select
          value={editedTodo.priority}
          onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value })}
        >
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </select>
        <div className="todo-item-actions">
          <button onClick={handleSave} className="save-btn">저장</button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">취소</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
          />
          <h3>{todo.title}</h3>
          <span
            className="priority-badge"
            style={{ backgroundColor: priorityColors[todo.priority] }}
          >
            {todo.priority === 'low' ? '낮음' : todo.priority === 'medium' ? '보통' : '높음'}
          </span>
        </div>
        {todo.description && <p className="todo-description">{todo.description}</p>}
      </div>
      <div className="todo-item-actions">
        <button onClick={() => setIsEditing(true)} className="edit-btn">수정</button>
        <button onClick={() => onDelete(todo._id)} className="delete-btn">삭제</button>
      </div>
    </div>
  );
}

export default TodoItem;
