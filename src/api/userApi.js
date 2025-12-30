import apiClient from './client';

// 회원가입
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', {
      name: userData.name,
      phone: userData.phone,
      password: userData.password,
      boat_name: userData.boat_name,
      boat_number: userData.boat_number,
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

// 로그인
export const loginUser = async (phone, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 내 정보 조회
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('사용자 프로필 조회 실패:', error);
    throw error;
  }
};

// 토큰 갱신
export const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    throw error;
  }
};

// MyPage 폼 데이터를 회원가입 API 형태로 변환
export const formatRegisterData = (formData) => {
  return {
    name: formData.name,
    phone: formData.phone,
    password: formData.password, // 폼에서 비밀번호 입력 받아야 함
    boat_name: formData.shipName,
    boat_number: formData.shipNumber,
  };
};