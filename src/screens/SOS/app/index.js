import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index({ goToMyPage }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isReporting, setIsReporting] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false); 
  const [reportTime, setReportTime] = useState(""); 
  const [isCollisionDetected, setIsCollisionDetected] = useState(false);
  const [isManualSOS, setIsManualSOS] = useState(false);

  const connectionStatus = "높음";
  const currentAddress = "부산 강서구";
  const currentCoords = "북위 35.1595° / 동경 129.1604°";
  const accidentProbability = "15%"; 

  const formatTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12 || 12; 
    return `${ampm} ${hours}시 ${minutes}분`;
  };

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
    setTimeout(() => {
      setIsDispatching(true);
    }, 3000);
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
        {/* 헤더 및 메인 화면 생략 (기존과 동일) */}
        <View style={styles.topHeader}>
          <View style={styles.brandArea}><Text style={styles.brandText}>▶ 바다콜</Text></View>
          <TouchableOpacity style={styles.userButton} onPress={goToMyPage || (() => Alert.alert('알림', '유저 정보'))}>
            <Text style={styles.userEmoji}>👤</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <View style={styles.probabilityBox}>
            <Text style={styles.probabilityText}>
              AI가 분석한 오늘의 사고 확률은... <Text style={styles.probabilityValue}>{accidentProbability}</Text>
            </Text>
          </View>
          <Text style={styles.mainTitle}>구조가 필요하신가요?</Text>
          <Text style={styles.mainSubtitle}>버튼을 누르면 신고가 접수됩니다</Text>
          <TouchableOpacity style={styles.sosOuter} onPress={handleSOS}>
            <View style={styles.sosInner}><Text style={styles.sosText}>SOS</Text></View>
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.addressText}>📍 {currentAddress}</Text>
            <Text style={styles.coordsText}>{currentCoords}</Text>
            <TouchableOpacity style={styles.collisionTestBtn} onPress={simulateCollision}>
              <Text style={styles.collisionTestBtnText}>⚠️ 충돌 감지 테스트</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomStatusWrapper}>
          <View style={styles.statusCard}><Text style={styles.statusLabel}>현재 위치</Text><Text style={styles.statusValue}>부산 강서구</Text></View>
          <View style={{ width: 15 }} />
          <View style={styles.statusCard}><Text style={styles.statusLabel}>연결 상태</Text>
            <Text style={[styles.statusValue, { color: '#4CAF50' }]}>{connectionStatus}</Text>
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
              ) : isDispatching ? (
                <View style={styles.reportingWrapper}>
                  <View style={styles.recordingRow}>
                    <View style={styles.greenDot} /><Text style={styles.recordingText}>음성 녹화 중</Text>
                  </View>
                  <Text style={styles.dispatchingTitle}>구조대가 출동하고 있습니다</Text>
                  <Text style={styles.dispatchingSubtitle}>구조대가 약 11분 후에 도착합니다</Text>
                </View>
              ) : (
                <View style={styles.reportingWrapper}>
                  <View style={styles.recordingRow}>
                    <View style={styles.greenDot} /><Text style={styles.recordingText}>음성 녹화 중</Text>
                  </View>
                  <Text style={styles.sendingTitle}>신고 전송 중...</Text>
                  <View style={styles.infoBoxLeft}>
                    <Text style={styles.infoTextLeft}>신고를 접수하고 있습니다.</Text>
                    <Text style={styles.infoTextLeft}>통신이 안정되면 신고가 발송됩니다.</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.floatingBottomWrapper}>
              {!isReporting ? (
                <View style={{paddingHorizontal: 30, paddingBottom: 50, width: '100%'}}>
                  <TouchableOpacity style={styles.redBtn} onPress={startReporting}>
                    <Text style={styles.btnText}>즉시 신고하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.grayCancelBtn} onPress={() => setModalVisible(false)}>
                    <Text style={styles.grayCancelBtnText}>취소하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* 신고 후 제어 패널 - 출동 중일 때도 버튼 유지됨 */
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
                  
                  {/* 버튼 영역 (항상 노출되도록 조건 삭제) */}
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.emergencyCallBtn} onPress={() => Alert.alert('112 연결')}>
                      <Text style={styles.emergencyCallText}>긴급전화</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.grayCancelBtnSmall} onPress={() => setModalVisible(false)}>
                      <Text style={styles.grayCancelBtnTextSmall}>신고 취소하기</Text>
                    </TouchableOpacity>
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

// 스타일 시트는 동일하므로 생략
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, height: 60 },
  brandText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  userEmoji: { fontSize: 20 },
  main: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  probabilityBox: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, marginBottom: 30, elevation: 2, borderWidth: 1, borderColor: '#eee' },
  probabilityText: { fontSize: 14, color: '#555' },
  probabilityValue: { fontWeight: 'bold', color: 'red' },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  mainSubtitle: { fontSize: 16, color: '#666', marginTop: 12, marginBottom: 50 },
  sosOuter: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  sosInner: { width: 160, height: 160, borderRadius: 80, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' },
  sosText: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  locationContainer: { marginTop: 25, alignItems: 'center' },
  addressText: { fontSize: 16, color: '#333', fontWeight: '500', marginBottom: 4 },
  coordsText: { fontSize: 13, color: '#888' },
  collisionTestBtn: { marginTop: 15, backgroundColor: '#FFF3E0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, borderWidth: 1, borderColor: '#FFB74D' },
  collisionTestBtnText: { color: '#E65100', fontSize: 13, fontWeight: 'bold' },
  bottomStatusWrapper: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 40 },
  statusCard: { width: 155, height: 80, backgroundColor: '#fff', borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  statusLabel: { fontSize: 12, color: '#999', marginBottom: 6 },
  statusValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
  modalContent: { flex: 0.7, width: '100%', paddingHorizontal: 30 },
  modalCenterArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  whiteFullSection: { backgroundColor: '#FFFFFF' },
  modalTitle: { color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 35, textAlign: 'center' },
  countCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginBottom: 35 },
  countNum: { color: 'white', fontSize: 60, fontWeight: 'bold' },
  policeInfoBox: { alignItems: 'center' },
  policeLine: { color: 'white', fontSize: 19, fontWeight: '600', lineHeight: 32, textAlign: 'center' },
  reportingWrapper: { width: '100%', paddingTop: 100 },
  recordingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50', marginRight: 8 },
  recordingText: { color: '#888', fontSize: 16 },
  sendingTitle: { fontSize: 34, fontWeight: 'bold', color: '#000', marginBottom: 15 },
  dispatchingTitle: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 12, lineHeight: 42 },
  dispatchingSubtitle: { fontSize: 18, color: '#888888', fontWeight: '500' },
  infoBoxLeft: { marginBottom: 10 },
  infoTextLeft: { color: '#444', fontSize: 15, lineHeight: 22 },
  floatingBottomWrapper: { flex: 0.3, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },
  reportControlPanelFloating: { 
    backgroundColor: '#fff', borderRadius: 25, padding: 20, width: '90%', elevation: 10, borderWidth: 1, borderColor: '#F0F0F0'
  },
  timeVerticalContainer: { marginBottom: 15 },
  timeWhiteBox: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#EEEEEE', backgroundColor: '#FFFFFF', marginBottom: 8,
  },
  timeLabelSame: { fontSize: 16, color: '#000', fontWeight: 'bold' },
  timeValueGray: { fontSize: 16, color: '#888888', fontWeight: 'bold', textAlign: 'right' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  emergencyCallBtn: { flex: 1, backgroundColor: 'red', paddingVertical: 16, borderRadius: 12, marginRight: 8, alignItems: 'center' },
  emergencyCallText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  grayCancelBtnSmall: { flex: 1, backgroundColor: '#666666', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  grayCancelBtnTextSmall: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  redBtn: { backgroundColor: 'red', padding: 20, borderRadius: 15, marginBottom: 15, alignItems: 'center', width: '100%' },
  grayCancelBtn: { backgroundColor: '#666666', padding: 20, borderRadius: 15, alignItems: 'center', width: '100%' },
  grayCancelBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});