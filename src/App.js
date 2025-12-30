import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SOSContainer from './screens/SOS/app/index';
import MyPage from './screens/MyPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('SOS');

  if (currentScreen === 'MyPage') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <MyPage goBack={() => setCurrentScreen('SOS')} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

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
});