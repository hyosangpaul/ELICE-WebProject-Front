import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import categories from '../../img/view_cozy.png'
import shopping_cart from '../../img/shopping_cart.png'

const ListContainer = styled.div`
    display : flex;
    align-items : center;
    flex-wrap : wrap;
    padding : 10px 80px;
    margin-left : 30px;
    & a {
        text-decoration : none;
        color : black;
        width : 45%;
        padding : 10px;
    }

`


const ListItem = styled.div`
    flex : 1;
    display : flex;
    flex-direct : column;
    width : 95%;
    height : 200px;
    margin : 10px;
    
    &:hover {
        background-color : lightgray;
    }

    
`

const MenuIcon = styled.div`
    padding : 50px;
    & img {
        width : 100%;
    }
    }
`
const MenuDesc = styled.div`
    padding-top : 40px;
    

    & span {
        font-size : 30px;
        font-weight : bold;
    }
`



const AdminMain = () => {


    return <ListContainer>
        <Link to="/adminOrders"><ListItem>
            <MenuIcon><img src={shopping_cart} alt='shopping_cart' /></MenuIcon>
            <MenuDesc><span>주문 관리</span><p>모든 주문 내역을 확인 및 관리할 수 있습니다.</p></MenuDesc>
        </ListItem></Link>
        <Link to="/adminCategories"><ListItem>
            <MenuIcon><img src={categories} alt='categories' /></MenuIcon>
            <MenuDesc><span>카테고리 및 제품 관리</span><p>제품 및 카테고리정보를 관리할 수 있습니다.</p></MenuDesc>
        </ListItem></Link>
    </ListContainer>
}

export default AdminMain;
