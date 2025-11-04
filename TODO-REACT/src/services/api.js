import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const todoAPI = {
  // 모든 할일 가져오기
  getAllTodos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // 특정 날짜의 할일 가져오기
  getTodosByDate: async (date) => {
    const response = await axios.get(`${API_URL}/date/${date}`);
    return response.data;
  },

  // 할일 추가
  createTodo: async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
  },

  // 할일 수정
  updateTodo: async (id, todo) => {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data;
  },

  // 할일 삭제
  deleteTodo: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
