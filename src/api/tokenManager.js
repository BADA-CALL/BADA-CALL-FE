import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';
const USER_ID_KEY = 'user_id';

// 토큰 저장
export const saveToken = async (token, userId) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    if (userId) {
      await SecureStore.setItemAsync(USER_ID_KEY, userId);
    }
  } catch (error) {
    console.error('토큰 저장 실패:', error);
  }
};

// 토큰 조회
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    return null;
  }
};

// 사용자 ID 조회
export const getUserId = async () => {
  try {
    const userId = await SecureStore.getItemAsync(USER_ID_KEY);
    return userId;
  } catch (error) {
    console.error('사용자 ID 조회 실패:', error);
    return null;
  }
};

// 토큰 삭제 (로그아웃)
export const clearToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_ID_KEY);
  } catch (error) {
    console.error('토큰 삭제 실패:', error);
  }
};

// 로그인 상태 확인
export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};