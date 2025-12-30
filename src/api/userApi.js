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

// 온보딩 설정 API
export const setupOnboarding = async (onboardingData, deviceId) => {
  try {
    const requestData = {
      device_id: deviceId,
      ...onboardingData,
    };

    console.log('온보딩 API 요청 데이터:', JSON.stringify(requestData, null, 2));

    const response = await apiClient.post('/onboarding/setup', requestData);
    console.log('온보딩 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('온보딩 설정 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    throw error;
  }
};

// 프로필 조회 (기기 ID 기반)
export const getProfileByDeviceId = async (deviceId) => {
  try {
    console.log('프로필 조회 API 호출, 기기 ID:', deviceId);
    const response = await apiClient.get(`/onboarding/profile/${deviceId}`);
    console.log('프로필 조회 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 조회 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    throw error;
  }
};

// 프로필 수정 (기기 ID 기반)
export const updateProfileByDeviceId = async (deviceId, profileData) => {
  try {
    console.log('프로필 수정 API 호출, 기기 ID:', deviceId);
    console.log('프로필 수정 데이터:', JSON.stringify(profileData, null, 2));

    const response = await apiClient.put(`/onboarding/profile/${deviceId}`, profileData);
    console.log('프로필 수정 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    console.error('에러 응답 상세:', JSON.stringify(error.response?.data, null, 2));

    // 422 에러일 경우 더 자세한 검증 에러 정보 출력
    if (error.response?.status === 422 && error.response?.data?.detail) {
      console.error('검증 에러 상세:', error.response.data.detail);
      error.response.data.detail.forEach((err, index) => {
        console.error(`검증 에러 ${index + 1}:`, {
          필드: err.loc,
          메시지: err.msg,
          타입: err.type,
          입력값: err.input
        });
      });
    }

    throw error;
  }
};

// 긴급 신고 API
export const sendEmergencyReport = async (reportData) => {
  try {
    console.log('긴급 신고 API 호출');
    console.log('긴급 신고 데이터:', JSON.stringify(reportData, null, 2));

    const response = await apiClient.post('/reports/emergency', reportData);
    console.log('긴급 신고 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('긴급 신고 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    throw error;
  }
};

// 위치 업데이트 API
export const updateLocation = async (locationData) => {
  try {
    console.log('위치 업데이트 API 호출');
    console.log('위치 데이터:', JSON.stringify(locationData, null, 2));

    const response = await apiClient.post('/location/update', locationData);
    console.log('위치 업데이트 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('위치 업데이트 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    throw error;
  }
};

// MyPage 폼 데이터를 회원가입 API 형태로 변환 (레거시)
export const formatRegisterData = (formData) => {
  return {
    name: formData.name,
    phone: formData.phone,
    password: formData.password, // 폼에서 비밀번호 입력 받아야 함
    boat_name: formData.shipName,
    boat_number: formData.shipNumber,
  };
};