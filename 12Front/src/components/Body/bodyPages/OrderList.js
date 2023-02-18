import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const OrderList = () => {

  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/orders", { headers: { Authorization: token } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        alert(error)
      });
  }, []);

  
  return (
    <OrderListDivUltra>
      <OrderListDiv>
        주문내역
      </OrderListDiv>
      <ContentDiv>
      {orders.map((order) => {
          return (
            <ItemDiv key={order.orderId}>
              <div>{order.createdAt}</div>
              <div>{order.total}</div>
              {/* <div>
                <select id={order.orderId} onChange={changeHandler} defaultValue={order.orderStatus}>
                  <option value="상품준비중">상품준비중</option>
                  <option value="상품배송중">상품배송중</option>
                  <option value="배송완료">배송완료</option>
                </select>
              </div>

              <button id={order.orderId} onClick={ deleteOrder }>
                주문 취소
              </button> */}
            </ItemDiv>
          );
        })}
      </ContentDiv>
    </OrderListDivUltra>
  )
}

const OrderListDivUltra = styled.div`
  display : flex;
  justify-content : center;
  padding : 50px;
  margin : 10px;
`

const OrderListDiv = styled.div`
  background-color : grey;
  width : 100px;
  height : 100px;
`

const ContentDiv = styled.div`
  background-color : white;
`
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

export default OrderList;