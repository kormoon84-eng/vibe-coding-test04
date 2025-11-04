import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ selectedDate, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('할일 제목을 입력해주세요!');
      return;
    }

    // 로컬 시간대를 유지하면서 날짜를 ISO 형식으로 변환
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}T00:00:00`;

    onAdd({
      ...formData,
      date: dateString
    });

    setFormData({
      title: '',
      description: '',
      priority: 'medium'
    });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>새 할일 추가</h3>
      <input
        type="text"
        placeholder="할일 제목"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="설명 (선택사항)"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <select
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
      >
        <option value="low">낮음</option>
        <option value="medium">보통</option>
        <option value="high">높음</option>
      </select>
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;
