import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 10px 80px;
  display: flex;
  flex-direction: column;
`;
const TitleDiv = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  font-size: 40px;
  font-weight: bold;
`;
const CountDiv = styled.div`
  display: flex;
  align-self: center;
  & div {
    margin: 10px;
    padding: 10px;
  }
`;

const ListDiv = styled.div`
  align-self: center;
`;

const ItemDiv = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  & button {
    border: none;
    background-color: gray;
    color: white;
    margin: 10px;
  }
`;

const AdminOrders = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/orders`, { headers: { Authorization: token } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const changeHandler = (e) => 
  {
   

    axios
      .post(`http://localhost:8080/admin/orders/${e.target.id}`, {  orderStatus: e.target.value })
      .then((res) => {
        console.log(res);
        alert("배송 상태가 수정되었습니다.");
        navigate("/adminOrders");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteOrder = (e) => {
    console.log(e.target.id);
    axios
      .delete(`http://localhost:8080/admin/orders/${e.target.id}`, { headers: { Authorization: token } })
      .then((res) => {
        window.location.href = "/adminOrders";
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container>
      <TitleDiv>주문 관리</TitleDiv>
      <CountDiv>
        <div>총 주문수 {orders.length}</div>
        <div>상품 준비중</div>
        <div>상품 배송중</div>
        <div>배송완료</div>
      </CountDiv>
      <ListDiv>
        {orders.map((order) => {
          return (
            <ItemDiv key={order.orderId}>
              <div>{order.createdAt}</div>
              <div>{order.total}</div>
              <div>
                <select id={order.orderId} onChange={changeHandler} defaultValue={order.orderStatus}>
                  <option value="상품준비중">상품준비중</option>
                  <option value="상품배송중">상품배송중</option>
                  <option value="배송완료">배송완료</option>
                </select>
              </div>

              <button id={order.orderId} onClick={ deleteOrder }>
                주문 취소
              </button>
            </ItemDiv>
          );
        })}
      </ListDiv>
    </Container>
  );
};

export default AdminOrders;
