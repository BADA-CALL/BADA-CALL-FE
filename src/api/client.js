import axios from 'axios';

// API 베이스 URL (개발/배포 환경에 따라 변경)
const BASE_URL = 'https://bada-call-be.onrender.com';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 모든 요청 전에 실행
apiClient.interceptors.request.use(
  async (config) => {
    // AsyncStorage에서 토큰 가져와서 헤더에 추가
    const { getToken } = require('./tokenManager');
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('API 요청:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 모든 응답 후에 실행
apiClient.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('응답 에러:', error.response?.status, error.response?.data);

    // 공통 에러 처리
    if (error.response?.status === 401) {
      // 인증 에러 처리 (로그인 페이지로 이동 등)
      console.log('인증이 필요합니다');
    } else if (error.response?.status === 500) {
      // 서버 에러 처리
      console.log('서버 에러가 발생했습니다');
    }

    return Promise.reject(error);
  }
);

export default apiClient;