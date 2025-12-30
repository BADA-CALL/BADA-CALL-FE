import * as MyPageStyled from './styles';
import { LeftArrowIcon } from '../../assets/icons';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getProfileByDeviceId, updateProfileByDeviceId } from '../../api/userApi';
import { getDeviceId } from '../../utils/deviceManager';

const Input = ({ label, placeholder, ...props }) => {
  return (
    <MyPageStyled.FormInputWrapper>
      <MyPageStyled.FormLabel> {label} </MyPageStyled.FormLabel>
      <MyPageStyled.FormInput
        placeholder={placeholder}
        {...props}
      />
    </MyPageStyled.FormInputWrapper>
  );
};

const Header = ({ goBack }) => {
  return (
    <MyPageStyled.HeaderContainer>
      <MyPageStyled.BackButton onPress={goBack}>
        <LeftArrowIcon size="32" />
      </MyPageStyled.BackButton>
      <MyPageStyled.HeaderTitle> 내정보 </MyPageStyled.HeaderTitle>
    </MyPageStyled.HeaderContainer>
  );
};

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shipName, setShipName] = useState("");
  const [shipNumber, setShipNumber] = useState("");
  const [emergencyContact1Name, setEmergencyContact1Name] = useState("");
  const [emergencyContact1Phone, setEmergencyContact1Phone] = useState("");
  const [emergencyContact2Name, setEmergencyContact2Name] = useState("");
  const [emergencyContact2Phone, setEmergencyContact2Phone] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 프로필 조회
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const deviceId = await getDeviceId();
      console.log('프로필 조회 시작, 기기 ID:', deviceId);

      const profile = await getProfileByDeviceId(deviceId);
      console.log('프로필 조회 결과 전체:', JSON.stringify(profile, null, 2));

      // 비상연락처 배열에서 데이터 추출
      const emergencyContacts = profile.emergency_contacts || [];
      const contact1 = emergencyContacts[0] || {};
      const contact2 = emergencyContacts[1] || {};

      // 각 필드별 데이터 확인
      console.log('이름:', profile.name);
      console.log('전화번호:', profile.phone);
      console.log('선박명:', profile.boat_name);
      console.log('선박번호:', profile.boat_number);
      console.log('비상연락처 배열:', emergencyContacts);
      console.log('비상연락처1:', contact1);
      console.log('비상연락처2:', contact2);

      // 조회된 데이터로 폼 채우기
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setShipName(profile.boat_name || "");
      setShipNumber(profile.boat_number || "");
      setEmergencyContact1Name(contact1.name || "");
      setEmergencyContact1Phone(contact1.phone || "");
      setEmergencyContact2Name(contact2.name || "");
      setEmergencyContact2Phone(contact2.phone || "");

      console.log('폼 데이터 설정 완료');
    } catch (error) {
      console.error('프로필 조회 실패:', error);
      console.error('에러 상세:', error.response?.data || error.message);
      Alert.alert('오류', '프로필 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 프로필 수정
  const handleUpdate = async () => {
    try {
      if (!name.trim() || !phone.trim()) {
        Alert.alert('알림', '이름과 전화번호는 필수 입력 사항입니다.');
        return;
      }

      setUpdating(true);
      const deviceId = await getDeviceId();

      // 온보딩 API와 동일한 형식으로 데이터 구성 (device_id 포함)
      const updateData = {
        device_id: deviceId,
        name: name.trim(),
        phone: phone.trim(),
        boat_name: shipName.trim() || null,
        boat_number: shipNumber.trim() || null,
        emergency_contact_1_name: emergencyContact1Name.trim() || null,
        emergency_contact_1_phone: emergencyContact1Phone.trim() || null,
        emergency_contact_2_name: emergencyContact2Name.trim() || null,
        emergency_contact_2_phone: emergencyContact2Phone.trim() || null,
      };

      console.log('프로필 수정 데이터:', updateData);

      await updateProfileByDeviceId(deviceId, updateData);
      Alert.alert('성공', '프로필이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      Alert.alert('오류', '프로필 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <MyPageStyled.FormContainer>
        <MyPageStyled.FormTitle>프로필 로딩 중...</MyPageStyled.FormTitle>
      </MyPageStyled.FormContainer>
    );
  }

  return (
    <MyPageStyled.FormContainer>
      <MyPageStyled.Form>
        <MyPageStyled.FormTitle> 사용자 정보 </MyPageStyled.FormTitle>
        <Input
          label="이름" placeholder="이름을 입력해주세요."
          value={name}
          onChangeText={setName}
        />
        <Input
          label="전화번호" placeholder="전화번호를 입력해주세요."
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </MyPageStyled.Form>
      <MyPageStyled.Form>
        <MyPageStyled.FormTitle> 선박 정보 </MyPageStyled.FormTitle>
        <Input
          label="선박명" placeholder="선박명을 입력해주세요."
          value={shipName}
          onChangeText={setShipName}
        />
        <Input
          label="선박번호" placeholder="선박 번호를 입력해주세요."
          value={shipNumber}
          onChangeText={setShipNumber}
        />
      </MyPageStyled.Form>
      <MyPageStyled.Form>
        <MyPageStyled.FormTitle> 비상 연락처 1 </MyPageStyled.FormTitle>
        <Input
          label="이름" placeholder="비상연락처 이름을 입력해주세요."
          value={emergencyContact1Name}
          onChangeText={setEmergencyContact1Name}
        />
        <Input
          label="전화번호" placeholder="비상연락처 전화번호를 입력해주세요."
          value={emergencyContact1Phone}
          onChangeText={setEmergencyContact1Phone}
          keyboardType="phone-pad"
        />
      </MyPageStyled.Form>
      <MyPageStyled.Form>
        <MyPageStyled.FormTitle> 비상 연락처 2 </MyPageStyled.FormTitle>
        <Input
          label="이름" placeholder="추가 비상연락처 이름을 입력해주세요."
          value={emergencyContact2Name}
          onChangeText={setEmergencyContact2Name}
        />
        <Input
          label="전화번호" placeholder="추가 비상연락처 전화번호를 입력해주세요."
          value={emergencyContact2Phone}
          onChangeText={setEmergencyContact2Phone}
          keyboardType="phone-pad"
        />
      </MyPageStyled.Form>
      <MyPageStyled.Button onPress={handleUpdate} disabled={updating}>
        <MyPageStyled.ButtonText>
          {updating ? "수정 중..." : "수정"}
        </MyPageStyled.ButtonText>
      </MyPageStyled.Button>
    </MyPageStyled.FormContainer>
  );
};

const MyPage = ({ goBack }) => {
  return (
    <MyPageStyled.Container>
      <Header goBack={goBack} />
      <Form />
    </MyPageStyled.Container>
  );
};

export default MyPage;