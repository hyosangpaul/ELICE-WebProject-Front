import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";
import Order from "./Order";
import OrderComplete from "./OrderComplete";


const Container = styled.div`
    display : flex;
    flex-direction : column;
    padding : 10px ;
`
const TitleDiv = styled.div`
    border-bottom : 1px grey solid;
    padding-bottom : 10px;
  
  & ul {
    list-style-type : none;
    
  }

  & li {
    display : inline;
  }
  
  & a {
    text-decoration : none;
    color : black;
  }
`

const BodyDiv = styled.div`
    //border : 1px red solid;
    
`

const Payments = () => {
    const currentPage = {
        fontWeight : "bold",
        fontSize : "40px",
    }

    return <Container>
        <TitleDiv>
            <ul>
                <li><NavLink to="/payments/cart" style={({ isActive }) => isActive ? currentPage : undefined} >장바구니</NavLink></li>{" > "}
                <li><NavLink to="/payments/order" style={({ isActive }) => isActive ? currentPage : undefined}>주문결제</NavLink></li>{" > "}
                <li>주문완료</li>
            </ul>
        </TitleDiv>
        <BodyDiv>
            <Routes>
                <Route path="cart" exact element={<Cart />} />
                <Route path="order" element={<Order />} />
                <Route path="orderComplete" element={<OrderComplete />} />
            </Routes>
        </BodyDiv>
    </Container>
}

export default Payments;