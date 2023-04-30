# 벌써 12시 쇼핑몰
> 엘리스 AI트랙 6기 12팀

## 소개
- 서비스명 : 벌써 12시 쇼핑몰
- 개발기간 : 2023.01.30 ~ 2023.02.10
- 주제: 아이들 선물 단체 구매 쇼핑몰
- 목표: 아이들의 선물을 카테고리 별로 조회하여 다량으로 구매할 수 있는 쇼핑몰

## 리팩토링

- 20230501 : 12back에서 app.js 설정 변경하여 서버 연결 성공

## 직접 구현한 기능

- 로그인 : JWT 토큰을 백엔드에서 발급 받아 LocalStorage에 저장하여 로그인 구현
- 로그아웃 : LocalStorage에서 JWT 토큰을 삭제 하여 로그아웃 구현
- 관리자계정 : 로그인 시 백엔드에서 JWT 토큰과 role을 발급 받아 role로 admin과 일반 유저를 구분
- 회원가입 : axios를 이용하여 post
- 유저정보 : axios를 이용하여 get
- 유저정보수정
- 유저탈퇴

### 이외 팀장으로서 기능 총괄

## 기술 스택

### 프론트엔드
<div> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
</div>

### 백엔드
<div> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</div>
