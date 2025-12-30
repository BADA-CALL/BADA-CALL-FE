import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  background-color: #f8f9fa;
`;

export const HeaderContainer = styled.View`
  padding-top: 40px;
  padding-bottom: 40px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
  line-height: 22px;
`;

export const FormContainer = styled.View`
  flex-direction: column;
  gap: 32px;
`;

export const Form = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  gap: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

export const FormTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
`;

export const RequiredMark = styled.Text`
  color: #e74c3c;
`;

export const FormInputWrapper = styled.View`
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.Text`
  color: #5a6c7d;
  font-size: 14px;
  font-weight: 500;
`;

export const FormInput = styled.TextInput`
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  background-color: #ffffff;
  color: #2c3e50;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? '#bdc3c7' : '#3498db'};
  padding: 18px;
  border-radius: 16px;
  align-items: center;
  margin-top: 20px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;