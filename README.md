<div align="center">

# **🧑🏻‍💻 직원들을 위한 위키 사이트 ( 토이프로젝트1 6조 육캔두잇 )**

![youcandoit_logo](https://github.com/Fastcampus-Youcandoit/frontend/assets/42928784/0a36f778-2a02-4e5e-9bee-20069c378ed5)

    💁🏻‍♂️ 야놀자 테크스쿨 1기, 토이프로젝트 6조의 직원들을 위한 위키 사이트 프로젝트입니다.

</div>

## 📌 프로젝트 Info

![image](https://github.com/Fastcampus-Youcandoit/frontend/assets/42928784/44f4dbb1-c506-4060-beb1-881d7a0763c9)

- 🔗 프로젝트 URL : [youcandoit-wiki](https://youcandoit-wiki.netlify.app)
- 🗓️ 개발 기간 : 2023.09.08 ~ 2023.09.22
- 🔨 사용 기술 스택

  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

## 팀원 소개

<!-- prettier-ignore-start -->
|어준혁(리더)|박지성|이연수|장영민|채민석|
|:-:|:-:|:-:|:-:|:-:|
|<img src="https://github.com/Fastcampus-Youcandoit/frontend/assets/117037249/15f4ae16-28ef-40d1-b9ce-d978884e8d81" alt="Eojoonhyuk" width="100" height="100">|<img src="https://github.com/Fastcampus-Youcandoit/frontend/assets/117037249/c1f038bc-93ae-4d7e-b0c3-d939f71f0293" alt="flamozzi" width="100" height="100">|<img src="https://github.com/Fastcampus-Youcandoit/frontend/assets/117037249/3580cf59-d8be-4f03-9fac-7ce8a06a8c18" alt="suehub" width="100" height="100">|<img src="https://github.com/Fastcampus-Youcandoit/frontend/assets/117037249/d668842a-3a3a-416b-a262-210719d225ec" alt="yeongmins" width="100" height="100">|<img src="https://github.com/Fastcampus-Youcandoit/frontend/assets/117037249/d4856748-092f-498f-a23f-2dd04088b96c" alt="chaeminseok" width="100" height="100">|
|[Eojoonhyuk](https://github.com/Eojoonhyuk)|[flamozzi](https://github.com/flamozzi)|[suehub](https://github.com/suehub)|[yeongmins](https://github.com/yeongmins)|[chaeminseok](https://github.com/chaeminseok)|

<!-- prettier-ignore-end -->

### ✔ 필수 구현사항

- [x] 문서편집, revision 기능을 제공(CRUD 가능하게)하여 업무일지를 작성할 수 있는 직원들을 위한 위키사이트 구현(마크다운 형식)
- [x] firebase database (Firestore) 이용
- [x] 모달을 활용한 근무 시간을 표시하는 시계 및 타이머 창 구현
- [x] 캐러셀을 활용한 회사 공지 페이지
- [x] 갤러리 페이지 / 업무일지 페이지 등 메뉴를 필터링 또는 카테고리화 하는 선택바 구현
- [x] netlify 등을 이용한 정적 페이지 배포
- [x] TypeScript 사용 필수
- [x] 과제에 대한 설명을 포함한 README.md 파일 작성
  - [x] 팀원별로 구현한 부분 소개

### ✔ 선택 구현사항

- [x] React 사용은 선택
- [ ] 기타 동작이 완료되기 전에 로딩 애니메이션 구현
- [ ] 페이지네이션
- [x] 관련된 기타 기능도 고려
- [x] eslint 설정, 커밋컨벤션, 문서화 등 팀프로젝트시 필요한 추가 작업들

### ✔ 팀원별 주담당 구현부

> 팀원 모두 자신의 주담당 구현부 이외에도 리팩토링 및 다른 팀원의 테스크에 참여하며 프로젝트 전체적으로 협업하였습니다.

- **어준혁**: 팀 리더, 프로젝트 관리 및 병합, 홈 페이지 담당
- **박지성**: 위키 페이지 및 마크다운 에디터 담당
- **이연수**: 갤러리 페이지 및 이미지 처리, 로그인 담당
- **장영민**: 라우팅 및 사이드바, 디자인 담당
- **채민석**: 출퇴근 타이머 및 회원가입 담당

## ✏️ userflow

![youcandoit_userflow](https://github.com/flamozzi/intro/assets/42928784/487f9ea2-9c3e-442b-9786-f41775405536)

# 🧑🏻‍💻 구현 사항

## 📍 홈

### 출퇴근 타이머
![홈_출퇴근](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/e677f5d1-2d41-4a9a-b97a-f1c7837d15ee)

### 홈\_캐러셀과 공지 및 갤러리
![홈_공지갤러리](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/cec64cdd-8228-4c39-b928-d1ac05aefd7c)

### 홈\_캘린더
![홈_캘린더](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/26247aa8-d96f-4f97-a6a9-ed34302c1577)


## 📍 로그인 및 회원가입

### 로그인 및 회원가입, 비밀번호 찾기와 로그아웃
![로그인_회원가입](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/d3513c0e-63e2-4980-b429-0344ede8c1ae)


## 📍 공지

### 공지사항 읽기와 작성 및 삭제
![공지](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/00816fe6-3a59-49cb-bdac-cac7666ae9fa)

## 📍 위키

### 사이드바 탐색과 문서 수정 및 저장
![위키](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/2c9eb0e6-4f5d-47be-9e4f-9c0d7062417c)


## 📍 갤러리

### 갤러리 사진 읽기 및 사이드바 필터링과 업로드 및 수정과 삭제
![갤러리](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/689451d0-e468-4458-8771-80bdf072e72a)

## 📍 반응형 구현

### 홈 반응형 구현
![홈반응형](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/4022425f-8a56-44bb-9797-02216325419f)


### 공지와 위키 및 갤러리 반응형 구현
![공지위키갤러리반응형](https://github.com/KDT1-FE/Y_FE_Toy1/assets/111065848/2ac386fc-21db-4b0d-a507-ca12d11cd6ea)



