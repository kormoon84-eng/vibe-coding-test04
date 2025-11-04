# Todo App with MongoDB Atlas

달력 기반 할일 관리 애플리케이션

## 기술 스택

### Backend
- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- CORS

### Frontend
- React (Vite)
- React Router DOM
- Axios
- React Calendar

## 실행 방법

### Backend
```bash
npm install
npm start
```

### Frontend
```bash
cd TODO-REACT
npm install
npm run dev
```

## 환경변수 설정

`.env` 파일 생성:
```
MONGO_URI=your_mongodb_atlas_uri
```

## 배포

- Backend: Cloudtype
- GitHub Actions를 통한 자동 배포
