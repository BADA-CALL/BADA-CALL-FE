# BADA-CALL-FE 프로젝트 분석

## 프로젝트 개요
**BadaCall**은 바다에서 사용하는 긴급 통신 서비스의 프론트엔드 애플리케이션입니다. React Native와 Expo를 기반으로 한 모바일 앱으로, 사용자 정보와 선박 정보를 관리하는 "내 정보" 페이지가 구현되어 있습니다.

## 기술 스택

### 프레임워크 및 런타임
- **React Native**: `0.81.5`
- **Expo**: `~54.0.30`
- **React**: `^19.2.3`

### 주요 라이브러리
- **styled-components**: `^6.1.19` - UI 스타일링
- **react-native-svg**: `15.12.1` - SVG 아이콘 렌더링
- **react-native-safe-area-context**: `~5.6.0` - Safe Area 처리

### 개발 도구
- **TypeScript**: `~19.1.10` - 타입 정의
- **Expo TypeScript Config**: TypeScript 설정 기본값 사용

## 프로젝트 구조

```
BADA-CALL-FE/
├── App.js                    # 메인 앱 컴포넌트
├── index.js                  # 앱 진입점
├── package.json              # 의존성 및 스크립트
├── app.json                  # Expo 설정
├── tsconfig.json            # TypeScript 설정
├── assets/                  # 정적 자원
│   ├── icons.jsx           # SVG 아이콘 컴포넌트
│   ├── icon.png            # 앱 아이콘
│   ├── splash-icon.png     # 스플래시 화면 아이콘
│   ├── adaptive-icon.png   # Android 적응형 아이콘
│   └── favicon.png         # 웹 파비콘
├── src/                    # 소스 코드
│   ├── pages/             # 페이지 컴포넌트
│   │   └── myPage.jsx     # 내 정보 페이지
│   ├── styles/            # 스타일 정의
│   │   └── myPage.js      # 내 정보 페이지 스타일
│   └── component/         # 공통 컴포넌트 (현재 비어있음)
└── sos/                   # 추가 프로젝트 (별도 Expo 앱)
```

## 주요 컴포넌트 분석

### 1. App.js
- 앱의 루트 컴포넌트
- 현재 MyPage 컴포넌트만 렌더링
- 파일 위치: `App.js:4-9`

### 2. MyPage 컴포넌트 (`src/pages/myPage.jsx`)
현재 앱의 주요 화면으로, 사용자 정보 입력 폼을 제공합니다.

#### 구성 요소:
- **Header**: 뒤로가기 버튼과 페이지 제목 (`myPage.jsx:17-24`)
- **Form**: 세 개의 정보 섹션으로 구성된 입력 폼 (`myPage.jsx:26-86`)
  - 사용자 정보: 이름, 전화번호
  - 선박 정보: 선박명, 선박번호
  - 비상 연락처: 이름, 관계, 전화번호
- **Input 컴포넌트**: 재사용 가능한 입력 필드 (`myPage.jsx:5-15`)

#### 상태 관리:
React Hooks(useState)를 사용하여 각 입력 필드의 상태를 관리합니다:
- `name`, `phone` - 사용자 정보
- `shipName`, `shipNumber` - 선박 정보
- `emergencyName`, `emergencyRelation`, `emergencyPhone` - 비상 연락처

### 3. 스타일링 (`src/styles/myPage.js`)
styled-components를 사용한 컴포넌트 기반 스타일링:
- **Container**: 메인 스크롤 컨테이너
- **Header 관련**: `HeaderContainer`, `HeaderTitle`
- **Form 관련**: `FormContainer`, `Form`, `FormTitle`, `FormInputWrapper`, `FormLabel`, `FormInput`
- **Button 관련**: `Button`, `ButtonText`

### 4. 아이콘 (`assets/icons.jsx`)
react-native-svg를 사용한 SVG 아이콘:
- `LeftArrowIcon`: 뒤로가기 화살표 아이콘

## Expo 설정 (app.json)

### 앱 메타데이터
- **이름**: "BadaCall"
- **버전**: "1.0.0"
- **방향**: 세로 모드 고정

### 플랫폼별 설정
- **iOS**: 태블릿 지원 활성화
- **Android**: Edge-to-edge 디스플레이, 적응형 아이콘 사용
- **Web**: 파비콘 설정

### 아키텍처
- **New Architecture**: 활성화 (React Native의 새로운 아키텍처 사용)

## 개발 스크립트

```json
{
  "start": "expo start",        # 개발 서버 시작
  "android": "expo start --android",  # Android 빌드
  "ios": "expo start --ios",          # iOS 빌드
  "web": "expo start --web"           # 웹 빌드
}
```

## 특징 및 주요 포인트

### 1. 바다/선박 관련 특화 기능
- 선박 정보 입력 (선박명, 선박번호)
- 비상 연락처 관리 (바다에서의 긴급상황 대비)

### 2. 크로스 플랫폼 지원
- iOS, Android, Web 모든 플랫폼에서 실행 가능
- Expo를 통한 쉬운 배포 및 개발

### 3. 현대적인 React 패턴
- 함수형 컴포넌트와 Hooks 사용
- styled-components를 통한 CSS-in-JS 스타일링

### 4. TypeScript 지원
- 타입 안정성을 위한 TypeScript 설정

## 향후 개발 방향성

현재는 단일 페이지(내 정보)만 구현되어 있지만, 프로젝트명과 구조를 보아 다음과 같은 기능들이 추가될 것으로 예상됩니다:

1. **긴급 통신 기능**: 바다에서의 SOS 호출
2. **위치 추적**: GPS 기반 현재 위치 전송
3. **통신 기록**: 긴급 통신 히스토리
4. **선박 관리**: 다중 선박 정보 관리
5. **네비게이션**: 여러 페이지 간 이동을 위한 라우팅

## 코드 품질 및 개선점

### 강점
- 깔끔한 컴포넌트 구조
- 재사용 가능한 Input 컴포넌트
- 일관된 스타일링 패턴
- TypeScript 지원

### 개선 가능한 부분
- 폼 유효성 검증 미구현
- 데이터 저장/불러오기 기능 부재
- 에러 처리 로직 부재
- 접근성(Accessibility) 고려사항 미반영