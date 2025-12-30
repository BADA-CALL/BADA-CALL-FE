import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'access_token';
const USER_ID_KEY = 'user_id';

// 토큰 저장
export const saveToken = async (token, userId) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    if (userId) {
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    }
  } catch (error) {
    console.error('토큰 저장 실패:', error);
  }
};

// 토큰 조회
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    return null;
  }
};

// 사용자 ID 조회
export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    return userId;
  } catch (error) {
    console.error('사용자 ID 조회 실패:', error);
    return null;
  }
};

// 토큰 삭제 (로그아웃)
export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error('토큰 삭제 실패:', error);
  }
};

// 로그인 상태 확인
export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};