# plab_user_react

**react-router-dom 활용 (build 후 express render 목적)**

## 프로젝트 개요

### - 축구 구장 및 소셜 매치 예약

### - 나에게 맞는 매치 분류 제공

### - 기존 사이트에 없던 ‘블랙리스트’ 기능 추가

이 프로젝트는 `react-router-dom`을 활용하여 클라이언트 사이드 라우팅을 구현하고, 빌드 후 Express.js를 사용하여 정적 파일을 렌더링하는 것을 목적으로 합니다.

## 디렉토리 구조

```plaintext
plab_user_react/
├── public/                 # 정적 파일 (HTML, 이미지 등)
├── src/                    # 소스 코드 디렉토리
│   ├── components/         # 리액트 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   ├── App.js              # 메인 앱 컴포넌트
│   └── index.js            # 엔트리 포인트
├── .gitignore              # Git 무시 파일 목록
├── README.md               # 프로젝트 설명 파일
├── memo.txt                # 메모 및 참고 사항
├── package-lock.json       # NPM 패키지 잠금 파일
└── package.json            # NPM 패키지 정보 파일
```
## 🛠 기술 스택

### 📌 Frontend
- **React.js**: SPA(단일 페이지 애플리케이션) 개발
- **React Router DOM**: 클라이언트 사이드 라우팅 처리
- **Fetch**: 백엔드 API와의 통신

### 📌 Backend (렌더링 목적)
- **Express.js**: React 정적 파일 서빙 및 API 백엔드 서버
- **Node.js**: 서버 환경

### 📌 DevOps & 기타
- **Prettier**: 코드 스타일 및 품질 관리

---

## 🚀 주요 기능

### 🔹 클라이언트 사이드 라우팅
- `react-router-dom`을 활용한 페이지 전환
- 동적 URL 매칭 및 네비게이션 구현

### 🔹 API 연동
- `Fetch`를 이용하여 백엔드와 데이터 송수신
- 로그인, 회원가입, 데이터 조회 기능

### 🔹 상태 관리
- `useState`와 `useEffect`를 활용한 상태 제어

### 🔹 Express 서버와 연동
- React 애플리케이션 빌드 후, Express로 정적 파일 서빙

---

## 📚 참고 자료

- [React 공식 문서](https://react.dev/)
- [React Router DOM 공식 문서](https://reactrouter.com/)
- [Express.js 공식 문서](https://expressjs.com/)
- [Axios 공식 문서](https://axios-http.com/)
