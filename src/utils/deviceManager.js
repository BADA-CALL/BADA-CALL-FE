import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values'; // UUID 라이브러리 의존성
import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_KEY = 'device_id';
const USER_ID_KEY = 'user_id';
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

/**
 * 기기 고유 ID 생성 및 관리 (Expo SecureStore 사용)
 */

// 기기 ID 생성 또는 조회
export const getDeviceId = async () => {
  try {
    let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);

    // 기기 ID가 없으면 새로 생성
    if (!deviceId) {
      deviceId = uuidv4();
      await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
  } catch (error) {
    console.error('기기 ID 생성/조회 실패:', error);
    // 에러 발생 시 임시 ID 생성
    return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

// 사용자 ID 저장
export const saveUserId = async (userId) => {
  try {
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
  } catch (error) {
    console.error('사용자 ID 저장 실패:', error);
  }
};

// 사용자 ID 조회
export const getUserId = async () => {
  try {
    return await SecureStore.getItemAsync(USER_ID_KEY);
  } catch (error) {
    console.error('사용자 ID 조회 실패:', error);
    return null;
  }
};

// 온보딩 완료 상태 저장
export const setOnboardingComplete = async (isComplete = true) => {
  try {
    await SecureStore.setItemAsync(ONBOARDING_COMPLETE_KEY, isComplete.toString());
  } catch (error) {
    console.error('온보딩 상태 저장 실패:', error);
  }
};

// 온보딩 완료 상태 확인
export const isOnboardingComplete = async () => {
  try {
    const isComplete = await SecureStore.getItemAsync(ONBOARDING_COMPLETE_KEY);
    return isComplete === 'true';
  } catch (error) {
    console.error('온보딩 상태 확인 실패:', error);
    return false;
  }
};

// 앱 초기화 (온보딩 재설정 등)
export const resetAppData = async () => {
  try {
    await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
    await SecureStore.deleteItemAsync(USER_ID_KEY);
    await SecureStore.deleteItemAsync(ONBOARDING_COMPLETE_KEY);
    console.log('앱 데이터 초기화 완료');
  } catch (error) {
    console.error('앱 데이터 초기화 실패:', error);
  }
};

// 기기 정보 로깅 (디버그용)
export const logDeviceInfo = async () => {
  try {
    const deviceId = await getDeviceId();
    const userId = await getUserId();
    const onboardingComplete = await isOnboardingComplete();

    console.log('=== 기기 정보 ===');
    console.log('Device ID:', deviceId);
    console.log('User ID:', userId);
    console.log('Onboarding Complete:', onboardingComplete);
  } catch (error) {
    console.error('기기 정보 로깅 실패:', error);
  }
};