## 프로젝트 개요

이 프로젝트는 **NestJS** 프레임워크를 학습하기 위해 만들어진 간단한 **Todo 앱**입니다. 프로젝트의 주요 목표는 **NestJS**의 핵심 개념을 이해하고, **Prisma**를 통해 데이터베이스와 상호작용하며, **JWT 인증**을 이용해 사용자 인증을 구현하는 것입니다. 

## 주요 기능

- **사용자 인증 및 인가**: JWT를 이용한 사용자 인증 (로그인)
- **할 일(Todo) 관리**:
    - 할 일 생성
    - 할 일 목록 조회
    - 할 일 삭제
- **사용자별 할 일 통계 제공**
    - 총 할 일 개수
    - 완료된 할 일 개수
- **API 문서화**: 자체 코드로 간략히 구현.

## 기술 스택

- **프레임워크**: [NestJS](https://nestjs.com/)
- **데이터베이스**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **인증**: JWT (JSON Web Tokens)

## 설치 및 실행 방법

#### 1. 레포지토리 클론

```bash
git clone https://github.com/yourusername/todo-app.git cd todo-app
```
#### 2. 의존성 설치

```bash
npm install
```
#### 3. 환경 변수 설정

루트 디렉토리에 **`.env`** 파일을 생성하고 다음과 같이 설정합니다:
```bash
# PostgreSQL 연결 정보
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db

# JWT 비밀 키
JWT_SECRET=your_jwt_secret
```
#### 4. 데이터베이스 설정

Prisma를 사용해 데이터베이스 마이그레이션을 적용합니다.

```bash
npx prisma migrate dev --name init
npx prisma generate
```
#### 5. 애플리케이션 실행
```bash
npm run start:dev
```

서버는 **`http://localhost:3000`**에서 실행됩니다.

## API 문서

API 문서는 **Swagger**를 통해 제공되며, **`http://localhost:3000/api`**에서 확인할 수 있습니다. Swagger를 통해 전체 API 엔드포인트와 요청/응답 형식을 테스트할 수 있습니다.

## 주요 엔드포인트

#### 인증 관련

- **POST /auth/login**: 사용자 로그인 (JWT 발급)

#### 할 일(Todo) 관리

- **POST /todos**: 새로운 할 일 추가
- **GET /todos**: 사용자 할 일 목록 조회
- **DELETE /todos/**: 할 일 삭제

#### 메인 페이지
- **GET /**:
    - API 목록 제공
    - 사용자별 할 일 통계
    - 전체 유저 수 조회

## 폴더 구조
```bash
src
├── auth                # 사용자 인증 모듈 (JWT)
├── todos               # 할 일(Todo) 관리 모듈
├── users               # 사용자 관리 모듈
├── prisma              # Prisma ORM 설정 및 데이터베이스 스키마
├── app.controller.ts   # 메인 컨트롤러
├── app.service.ts      # 메인 서비스
├── main.ts             # 애플리케이션 시작점
└── ...                 # 기타 설정 파일
```

## 사용한 라이브러리
- [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt)
- [@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport)
- [Prisma](https://www.prisma.io/)

## 기여 방법
이 프로젝트는 NestJS 학습을 위한 목적이므로 기여나 피드백은 언제나 환영합니다. 수정할 사항이 있으면 PR(Pull Request)을 보내주시거나, Issue를 열어주세요.

## 라이선스
MIT License