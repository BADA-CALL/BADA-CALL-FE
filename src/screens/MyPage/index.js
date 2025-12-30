import * as MyPageStyled from './styles';
import { LeftArrowIcon } from '../../assets/icons';
import { useState } from 'react';

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
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

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
        <MyPageStyled.FormTitle> 비상 연락처 </MyPageStyled.FormTitle>
        <Input
          label="이름" placeholder="이름을 입력해주세요."
          value={emergencyName}
          onChangeText={setEmergencyName}
        />
        <Input
          label="관계" placeholder="관계를 입력해주세요."
          value={emergencyRelation}
          onChangeText={setEmergencyRelation}
        />
        <Input
          label="전화번호" placeholder="전화번호를 입력해주세요."
          value={emergencyPhone}
          onChangeText={setEmergencyPhone}
        />
      </MyPageStyled.Form>
      <MyPageStyled.Button>
        <MyPageStyled.ButtonText> 수정 </MyPageStyled.ButtonText>
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