import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SOS from './screens/SOS/app/index';
import MyPage from './screens/MyPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('SOS');

  if (currentScreen === 'MyPage') {
    return (
      <SafeAreaProvider>
        <MyPage goBack={() => setCurrentScreen('SOS')} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SOS goToMyPage={() => setCurrentScreen('MyPage')} />
    </SafeAreaProvider>
  );
}