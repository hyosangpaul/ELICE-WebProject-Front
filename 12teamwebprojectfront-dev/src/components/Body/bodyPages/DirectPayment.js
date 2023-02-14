import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import DirectOrder from "./DirectOrder";
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

const DirectPayments = () => {
    const currentPage = {
        fontWeight : "bold",
        fontSize : "40px",
    }

    return <Container>
        <TitleDiv>
            <ul>
                <li><NavLink to="/DirectPayments/DirectOrder" style={({ isActive }) => isActive ? currentPage : undefined}>주문결제</NavLink></li>{" > "}
                <li>주문완료</li>
            </ul>
        </TitleDiv>
        <BodyDiv>
            <Routes>
                <Route path="DirectOrder" element={<DirectOrder />} />
                <Route path="orderComplete" element={<OrderComplete />} />
            </Routes>
        </BodyDiv>
    </Container>
}

export default DirectPayments;