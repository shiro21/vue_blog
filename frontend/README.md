# 개인 Vue연습 프로젝트 - Vue Blog

## Intro
- Solo Project
- 프로젝트 기간 ( 2022.09.28 ~ 2022.10.04 )
- ID 

## Tool
- Front-End : Vue
npm run serve
- Back-End : NodeJS ( Javascript )
nodemon app
MySQL

### Join ( 회원가입 )
- 아이디
- 비밀번호
- 비밀번호 확인 ( 일치 확인 )
- 닉네임
- 생년월일
- 성별

### Login
- 아이디 로그인

### Main
* Header
- 검색
- 프로필 이동
- 리스트( 메뉴 ) : 프로필 이동, 글 쓰러가기, 로그아웃

* Contents


### Editor
- 제목 ( max: 20자 )
- 이미지 추가 ( 한장 )
- 내용입력 ( max: 500자 )

### Profile
- 아이디
- 프로필 이미지 ( 변경가능 )
- 이메일
- 닉네임 ( 변경가능 )
- 성별
- 생년월일
- 생성날짜
- 업데이트 날짜 ( 업데이트 후 자동변경 )

### List/:id
- 카드내용 : 제목, 이미지, 내용( for문 테스트 )

### Vue Project
* Vue와 NodejS, MySQL을 사용해서 만든 프로젝트입니다.
VueJS의 기본 사용법을 숙지하기 위한 프로젝트 내용입니다.
데이터는 MySQL에 저장했습니다. ( 이미지 또한 base64로 변환시켜서 MySQL에 저장했습니다. )

* vuex를 사용해서 로그인 정보 토큰을 불러왔습니다. ( onMounted()부분에서 inject( 주입 )했습니다. )



# frontend

<!-- Start -->
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
