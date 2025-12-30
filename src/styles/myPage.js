import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 60px 28px 0;
  flex-direction: column;
  gap: 40px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
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