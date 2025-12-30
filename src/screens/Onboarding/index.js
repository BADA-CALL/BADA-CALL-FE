import React, { useState } from 'react';
import * as OnboardingStyled from './styles';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';

const Input = ({ label, placeholder, value, onChangeText, ...props }) => {
  return (
    <OnboardingStyled.FormInputWrapper>
      <OnboardingStyled.FormLabel>{label}</OnboardingStyled.FormLabel>
      <OnboardingStyled.FormInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </OnboardingStyled.FormInputWrapper>
  );
};

const Onboarding = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [boatName, setBoatName] = useState("");
  const [boatNumber, setBoatNumber] = useState("");
  const [emergencyContact1Name, setEmergencyContact1Name] = useState("");
  const [emergencyContact1Phone, setEmergencyContact1Phone] = useState("");
  const [emergencyContact2Name, setEmergencyContact2Name] = useState("");
  const [emergencyContact2Phone, setEmergencyContact2Phone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // 필수 필드 검증
    if (!name.trim() || !phone.trim()) {
      Alert.alert('알림', '이름과 전화번호는 필수 입력 사항입니다.');
      return;
    }

    try {
      setLoading(true);

      // 온보딩 데이터 구성 (API 명세에 맞춤)
      const onboardingData = {
        name: name.trim(),
        phone: phone.trim(),
        boat_name: boatName.trim() || null,
        boat_number: boatNumber.trim() || null,
        emergency_contact_1_name: emergencyContact1Name.trim() || null,
        emergency_contact_1_phone: emergencyContact1Phone.trim() || null,
        emergency_contact_2_name: emergencyContact2Name.trim() || null,
        emergency_contact_2_phone: emergencyContact2Phone.trim() || null,
      };

      // onComplete 콜백으로 데이터 전달
      await onComplete(onboardingData);

    } catch (error) {
      console.error('온보딩 실패:', error);
      Alert.alert('오류', '온보딩 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <OnboardingStyled.Container>
        <OnboardingStyled.HeaderContainer>
          <OnboardingStyled.HeaderTitle>바다콜 설정</OnboardingStyled.HeaderTitle>
          <OnboardingStyled.HeaderSubtitle>
            안전한 항해를 위해 정보를 입력해주세요
          </OnboardingStyled.HeaderSubtitle>
        </OnboardingStyled.HeaderContainer>

        <OnboardingStyled.FormContainer>
          <OnboardingStyled.Form>
            <OnboardingStyled.FormTitle>기본 정보 <OnboardingStyled.RequiredMark>*</OnboardingStyled.RequiredMark></OnboardingStyled.FormTitle>
            <Input
              label="이름 *"
              placeholder="이름을 입력해주세요"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="전화번호 *"
              placeholder="010-1234-5678"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </OnboardingStyled.Form>

          <OnboardingStyled.Form>
            <OnboardingStyled.FormTitle>선박 정보</OnboardingStyled.FormTitle>
            <Input
              label="선박명"
              placeholder="선박명을 입력해주세요"
              value={boatName}
              onChangeText={setBoatName}
            />
            <Input
              label="선박번호"
              placeholder="부산-123"
              value={boatNumber}
              onChangeText={setBoatNumber}
            />
          </OnboardingStyled.Form>

          <OnboardingStyled.Form>
            <OnboardingStyled.FormTitle>비상 연락처 1</OnboardingStyled.FormTitle>
            <Input
              label="이름"
              placeholder="가족, 친구 등"
              value={emergencyContact1Name}
              onChangeText={setEmergencyContact1Name}
            />
            <Input
              label="전화번호"
              placeholder="010-9876-5432"
              value={emergencyContact1Phone}
              onChangeText={setEmergencyContact1Phone}
              keyboardType="phone-pad"
            />
          </OnboardingStyled.Form>

          <OnboardingStyled.Form>
            <OnboardingStyled.FormTitle>비상 연락처 2</OnboardingStyled.FormTitle>
            <Input
              label="이름"
              placeholder="추가 비상 연락처"
              value={emergencyContact2Name}
              onChangeText={setEmergencyContact2Name}
            />
            <Input
              label="전화번호"
              placeholder="010-1111-2222"
              value={emergencyContact2Phone}
              onChangeText={setEmergencyContact2Phone}
              keyboardType="phone-pad"
            />
          </OnboardingStyled.Form>

          <OnboardingStyled.Button onPress={handleSubmit} disabled={loading}>
            <OnboardingStyled.ButtonText>
              {loading ? "설정 중..." : "바다콜 시작하기"}
            </OnboardingStyled.ButtonText>
          </OnboardingStyled.Button>
        </OnboardingStyled.FormContainer>
      </OnboardingStyled.Container>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;