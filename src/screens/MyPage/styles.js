import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  flex-direction: column;
`;

export const HeaderContainer = styled.View`
  padding-top: 24px;
  padding-bottom: 32px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: 12px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

export const FormContainer = styled.View`
  flex-direction: column;
  gap: 40px;
`;

export const Form = styled.View`
  flex-direction: column;
  gap: 20px;
`;

export const FormTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

export const FormInputWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FormLabel = styled.Text`
  color: #9A9A9A;
  font-size: 16px;
  font-weight: 500;
`;

export const FormInput = styled.TextInput`
  text-align: right;
  font-size: 16px;
  font-weight: 500;
`;

export const Button = styled.Pressable`
  margin-top: 20px;
  margin-bottom: 28px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: #9A9A9A;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  text-align: center;
`;