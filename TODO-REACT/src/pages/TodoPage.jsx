import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { todoAPI } from '../services/api';
import './TodoPage.css';

function TodoPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodosByDate(selectedDate);
  }, [selectedDate]);

  const fetchTodosByDate = async (date) => {
    setLoading(true);
    try {
      // 로컬 시간대를 유지하면서 날짜 문자열 생성
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      const data = await todoAPI.getTodosByDate(dateString);
      setTodos(data);
    } catch (error) {
      console.error('할일 가져오기 실패:', error);
      alert('할일을 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('할일 추가 실패:', error);
      alert('할일 추가에 실패했습니다.');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, updates);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('할일 수정 실패:', error);
      alert('할일 수정에 실패했습니다.');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('할일 삭제 실패:', error);
      alert('할일 삭제에 실패했습니다.');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-page">
      <div className="todo-container">
        <header className="todo-header">
          <h1>📅 할일 관리</h1>
        </header>

        <div className="todo-content">
          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              locale="ko-KR"
            />
          </div>

          <div className="todo-section">
            <div className="selected-date">
              <h2>{formatDate(selectedDate)}</h2>
              <p>
                총 {todos.length}개 | 완료 {completedCount}개 | 남음 {todos.length - completedCount}개
              </p>
            </div>

            <TodoForm selectedDate={selectedDate} onAdd={handleAddTodo} />

            <div className="todo-list">
              {loading ? (
                <p className="loading">로딩 중...</p>
              ) : todos.length === 0 ? (
                <p className="empty">이 날짜에 등록된 할일이 없습니다.</p>
              ) : (
                todos.map(todo => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
