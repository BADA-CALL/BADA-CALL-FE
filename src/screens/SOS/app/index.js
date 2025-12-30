import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { height } = Dimensions.get('window');

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isReporting, setIsReporting] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false); 
  const [reportTime, setReportTime] = useState(""); 
  const [isCollisionDetected, setIsCollisionDetected] = useState(false);
  const [isManualSOS, setIsManualSOS] = useState(false);
  
  const [userLocation, setUserLocation] = useState(null);

  const currentCoords = "북위 35.1595° / 동경 129.1604°";

  const formatTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12 || 12; 
    return `${ampm} ${hours}시 ${minutes}분`;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    })();
  }, []);

  useEffect(() => {
    let timer;
    if (modalVisible && countdown > 0 && !isReporting) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && !isReporting) {
      startReporting();
    }
    return () => clearInterval(timer);
  }, [modalVisible, countdown, isReporting]);

  const startReporting = () => {
    setReportTime(formatTime());
    setIsReporting(true);
    setIsDispatching(false);
    setTimeout(() => setIsDispatching(true), 3000);
  };

  const simulateCollision = () => {
    setIsCollisionDetected(true);
    setIsManualSOS(false);
    setCountdown(60); 
    setIsReporting(false);
    setIsDispatching(false);
    setModalVisible(true);
  };

  const handleSOS = () => {
    setIsCollisionDetected(false);
    setIsManualSOS(true);
    setCountdown(10); 
    setIsReporting(false);
    setIsDispatching(false);
    setModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.brandArea}><Text style={styles.brandText}>▶ 바다콜</Text></View>
          <TouchableOpacity style={styles.userButton} onPress={() => Alert.alert('알림', '유저 정보')}>
            <Text style={styles.userEmoji}>👤</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <View style={styles.probabilityBox}>
            <Text style={styles.probabilityText}>AI 분석 사고 확률... <Text style={styles.probabilityValue}>15%</Text></Text>
          </View>
          <Text style={styles.mainTitle}>구조가 필요하신가요?</Text>
          <Text style={styles.mainSubtitle}>버튼을 누르면 신고가 접수됩니다</Text>
          <TouchableOpacity style={styles.sosOuter} onPress={handleSOS}>
            <View style={styles.sosInner}><Text style={styles.sosText}>SOS</Text></View>
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.addressText}>📍 부산 강서구</Text>
            <Text style={styles.coordsText}>{currentCoords}</Text>
            <TouchableOpacity style={styles.collisionTestBtn} onPress={simulateCollision}>
              <Text style={styles.collisionTestBtnText}>⚠️ 충돌 감지 테스트</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomStatusWrapper}>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>현재 위치</Text>
            <Text style={styles.statusValue}>부산 강서구</Text>
          </View>
          <View style={{ width: 15 }} />
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>연결 상태</Text>
            <Text style={[styles.statusValue, { color: '#4CAF50' }]}>높음</Text>
          </View>
        </View>

        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={[styles.modalBg, isReporting && { backgroundColor: '#FFFFFF' }]}>
            <View style={[styles.modalContent, isReporting && styles.whiteFullSection]}>
              {!isReporting ? (
                <View style={styles.modalCenterArea}>
                  <Text style={styles.modalTitle}>{isManualSOS ? "긴급 구조 요청" : "큰 충돌을 감지했습니다"}</Text>
                  <View style={styles.countCircle}><Text style={styles.countNum}>{countdown}</Text></View>
                  <View style={styles.policeInfoBox}>
                    <Text style={styles.policeLine}>사고 상황으로 간주하고</Text>
                    <Text style={styles.policeLine}>{countdown}초 뒤에 경찰에게 긴급 구조 요청이 발신됩니다.</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.reportingWrapper}>
                  <View style={styles.recordingRow}><View style={styles.greenDot} /><Text style={styles.recordingText}>음성 녹화 중</Text></View>
                  
                  {isDispatching ? (
                    <>
                      <Text style={styles.dispatchingTitle}>구조대가 출동하고 있습니다</Text>
                      <Text style={styles.dispatchingSubtitle}>구조대가 약 11분 후에 도착합니다</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.dispatchingTitle}>신고 전송 중...</Text>
                      <View style={styles.infoBoxLeft}>
                        {/* 요청하신 문구로 수정 완료 */}
                        <Text style={styles.infoTextLeft}>신고를 접수하고 있습니다. 통신이 안정되면 신고가 발송됩니다.</Text>
                      </View>
                    </>
                  )}
                  
                  <View style={styles.fullMapContainer}>
                    {userLocation && (
                      <MapView
                        provider={PROVIDER_DEFAULT}
                        style={styles.mapInModal}
                        showsUserLocation={true}
                        region={{
                          latitude: userLocation.latitude + -0.013, 
                          longitude: userLocation.longitude,
                          latitudeDelta: 0.012,
                          longitudeDelta: 0.012,
                        }}
                      >
                        <Marker 
                          coordinate={{ 
                            latitude: userLocation.latitude + 0.001, 
                            longitude: userLocation.longitude + 0.003 
                          }}
                          title="사고 지점"
                          pinColor="red"
                        />
                      </MapView>
                    )}
                  </View>
                </View>
              )}
            </View>

            <View style={styles.floatingBottomWrapper}>
              {!isReporting ? (
                <View style={{paddingHorizontal: 30, paddingBottom: 50, width: '100%'}}>
                  <TouchableOpacity style={styles.redBtn} onPress={startReporting}><Text style={styles.btnText}>즉시 신고하기</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.grayCancelBtn} onPress={() => setModalVisible(false)}><Text style={styles.grayCancelBtnText}>취소하기</Text></TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.reportControlPanelFloating, { marginBottom: 20 }]}>
                  <View style={styles.timeVerticalContainer}>
                    <View style={styles.timeWhiteBox}>
                      <Text style={styles.timeLabelSame}>사고 신고 시각</Text>
                      <Text style={styles.timeValueGray}>{reportTime}</Text>
                    </View>
                    <View style={styles.timeWhiteBox}>
                      <Text style={styles.timeLabelSame}>구조대 출동시각</Text>
                      <Text style={styles.timeValueGray}>{isDispatching ? "방금 전" : "신고 접수 중..."}</Text>
                    </View>
                  </View>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.emergencyCallBtn} onPress={() => Alert.alert('112 연결')}><Text style={styles.emergencyCallText}>긴급전화</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.grayCancelBtnSmall} onPress={() => setModalVisible(false)}><Text style={styles.grayCancelBtnTextSmall}>신고 취소하기</Text></TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, height: 60 },
  brandText: { fontSize: 18, fontWeight: 'bold' },
  userButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  userEmoji: { fontSize: 20 },
  main: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  probabilityBox: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10 },
  probabilityValue: { fontWeight: 'bold', color: 'red' },
  mainTitle: { fontSize: 28, fontWeight: 'bold' },
  mainSubtitle: { fontSize: 16, color: '#666', marginTop: 10 },
  sosOuter: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  sosInner: { width: 160, height: 160, borderRadius: 80, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' },
  sosText: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  locationContainer: { marginTop: 25, alignItems: 'center' },
  addressText: { fontSize: 16, color: '#333', fontWeight: '500' },
  coordsText: { fontSize: 13, color: '#888', marginTop: 4 },
  collisionTestBtn: { marginTop: 15, backgroundColor: '#FFF3E0', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#FFB74D' },
  collisionTestBtnText: { color: '#E65100', fontWeight: 'bold' },
  bottomStatusWrapper: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 40 },
  statusCard: { width: 155, height: 80, backgroundColor: '#fff', borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  statusLabel: { fontSize: 12, color: '#999', marginBottom: 6 },
  statusValue: { fontSize: 16, fontWeight: 'bold' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
  modalContent: { flex: 1 },
  whiteFullSection: { backgroundColor: '#FFFFFF' },
  modalCenterArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalTitle: { color: 'white', fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  countCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  countNum: { color: 'white', fontSize: 60, fontWeight: 'bold' },
  policeInfoBox: { alignItems: 'center' },
  policeLine: { color: 'white', fontSize: 17, textAlign: 'center', lineHeight: 26 },
  reportingWrapper: { flex: 1, paddingTop: 100, paddingHorizontal: 30 },
  recordingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50', marginRight: 8 },
  recordingText: { color: '#888', fontSize: 16 },
  dispatchingTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  dispatchingSubtitle: { fontSize: 18, color: '#888', fontWeight: '500', marginBottom: 20 },
  infoBoxLeft: { marginBottom: 20 },
  infoTextLeft: { color: '#444', fontSize: 15, lineHeight: 22 },
  fullMapContainer: { position: 'absolute', top: 260, bottom: -height, left: 0, right: 0 },
  mapInModal: { flex: 1 },
  floatingBottomWrapper: { position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' },
  reportControlPanelFloating: { backgroundColor: '#fff', borderRadius: 25, padding: 20, width: '90%', elevation: 5 },
  timeVerticalContainer: { marginBottom: 15 },
  timeWhiteBox: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 8 },
  timeLabelSame: { fontWeight: 'bold' },
  timeValueGray: { color: '#888' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  emergencyCallBtn: { flex: 1, backgroundColor: 'red', padding: 16, borderRadius: 12, marginRight: 8, alignItems: 'center' },
  grayCancelBtnSmall: { flex: 1, backgroundColor: '#666', padding: 16, borderRadius: 12, alignItems: 'center' },
  redBtn: { backgroundColor: 'red', padding: 20, borderRadius: 15, width: '100%', marginBottom: 10, alignItems: 'center' },
  grayCancelBtn: { backgroundColor: '#666', padding: 20, borderRadius: 15, width: '100%', alignItems: 'center' },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  grayCancelBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  emergencyCallText: { color: 'white', fontWeight: 'bold' },
  grayCancelBtnTextSmall: { color: 'white', fontWeight: 'bold' },
});