// Study_04 Node.js Project with MongoDB
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB 연결 URL (환경변수 사용)
const mongoURL = process.env.MONGO_URI;

if (!mongoURL) {
  console.error('❌ MONGO_URI 환경변수가 설정되지 않았습니다!');
  process.exit(1);
}

// 현재 연결 URL 확인 (디버깅용)
console.log('연결 중인 MongoDB:', mongoURL.includes('mongodb+srv') ? 'MongoDB Atlas (클라우드)' : 'Local MongoDB');
console.log('데이터베이스:', mongoURL.split('/').pop().split('?')[0]);
console.log('전체 URI:', mongoURL);

// 미들웨어
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(mongoURL)
  .then(() => {
    console.log('MongoDB 연결 성공!');
    console.log('실제 연결된 HOST:', mongoose.connection.host);
    console.log('실제 연결된 DB:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

// 연결 상태 모니터링
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose가 연결됨:', mongoose.connection.host);
});

// 라우터
app.use('/api/todos', todoRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '안녕하세요! Todo API 서버가 실행 중입니다.' });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
