import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SOSContainer from './screens/SOS/app/index';
import MyPage from './screens/MyPage';
import Onboarding from './screens/Onboarding';
import { isOnboardingComplete, setOnboardingComplete, getDeviceId, saveUserId } from './utils/deviceManager';
import { setupOnboarding } from './api/userApi';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('LOADING'); // LOADING, ONBOARDING, SOS, MyPage
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 온보딩 상태 확인
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingDone = await isOnboardingComplete();

      if (onboardingDone) {
        setCurrentScreen('SOS'); // 온보딩 완료 시 SOS 메인 화면으로
      } else {
        setCurrentScreen('ONBOARDING'); // 온보딩 필요 시 온보딩 화면으로
      }
    } catch (error) {
      console.error('온보딩 상태 확인 실패:', error);
      setCurrentScreen('ONBOARDING'); // 에러 시 온보딩으로
    } finally {
      setLoading(false);
    }
  };

  // 온보딩 완료 처리
  const handleOnboardingComplete = async (onboardingData) => {
    try {
      console.log('온보딩 처리 시작');
      console.log('수신된 온보딩 데이터:', JSON.stringify(onboardingData, null, 2));

      const deviceId = await getDeviceId();
      console.log('기기 ID:', deviceId);

      // 서버에 온보딩 데이터 전송
      const response = await setupOnboarding(onboardingData, deviceId);

      // 온보딩 완료 상태 및 사용자 ID 저장
      await setOnboardingComplete(true);
      await saveUserId(response.user_id);

      // SOS 메인 화면으로 이동
      setCurrentScreen('SOS');

      Alert.alert('환영합니다!', '바다콜 설정이 완료되었습니다.');
    } catch (error) {
      console.error('온보딩 처리 실패:', error);
      console.error('에러 세부사항:', error.response?.data || error.message);
      Alert.alert('오류', '설정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.center]}>
          {/* 로딩 스피너나 스플래시 화면을 여기에 */}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 온보딩 화면
  if (currentScreen === 'ONBOARDING') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Onboarding onComplete={handleOnboardingComplete} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // MyPage 화면
  if (currentScreen === 'MyPage') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <MyPage goBack={() => setCurrentScreen('SOS')} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // SOS 메인 화면 (기본)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SOSContainer goToMyPage={() => setCurrentScreen('MyPage')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { justifyContent: 'center', alignItems: 'center' },
});