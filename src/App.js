import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// 'app' 폴더 안의 index.js를 명확하게 지칭해서 가져옵니다.
import SOSContainer from './screens/SOS/app/index'; 

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* SOSContainer가 유효한 컴포넌트인지 확인 */}
        <SOSContainer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});