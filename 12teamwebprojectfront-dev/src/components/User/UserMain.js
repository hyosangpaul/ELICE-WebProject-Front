import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserMain = () => {

    const navigate = useNavigate()

    return (
        <div style = {{
            display : 'flex',
            justifyContent : 'center'
        }}>
            <UserMainDiv>
                    <UserInfoBtn
                    onClick = {() => {
                        navigate('/UserInfo')
                    }}>유저 정보</UserInfoBtn>
                    <OrderListBtn
                    onClick = {() => {
                        navigate('/OrderList')
                    }}>주문 내역</OrderListBtn>
                    <LogoutBtn
                    onClick = {() => {
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('role')
                        alert('로그아웃 되었습니다.')
                        // 로컬스토리지에 토큰이 삭제된 상태를 인식시키기 위하여 새로고침으로 href로 이동
                        window.location.href = '/'
                    }}
                    >로그아웃</LogoutBtn>
            </UserMainDiv>
            </div>
    )
}

const UserMainDiv = styled.div`
    width : 30%;
    height : 300px;
    padding : 100px;
    margin : 100px;
    display : flex;
    flex-direction : column;
    justify-content : center;
`

const LogoutBtn = styled.button`
    padding : 10px;
    border-radius : 5px;
    border-color : white;
    background-color : grey;
    color : white;
`

const OrderListBtn = styled.button`
    padding : 10px;
    border-radius : 5px;
    border-color : white;
    background-color : grey;
    color : white;
`

const UserInfoBtn = styled.button`
    padding : 10px;
    border-radius : 5px;
    border-color : white;
    background-color : grey;
    color : white;
`

export default UserMain;