import React, { useState , useEffect} from "react";
import styled from "styled-components";
import { useNavigate , useLocation } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from '../../../lib/utils'

const Container = styled.form`
    display : flex;
    padding : 10px 80px;
`
const OrderInfo = styled.div`
    width : 60%;
    margin : 10px;
    padding : 10px;
    box-shadow: 0 5px 10px grey;
    & h3 {
        border-bottom: 1px grey solid;
        padding-bottom: 10px;
      }
    & label {
        display : block;
        padding-bottom : 20px;
    }

    & input {
        width : 80%;
    }

    & h6 {

        font-weight : bold;
        weight : 30%;

        
    }
`

const PaymentInfo = styled.div`
  box-shadow: 0 5px 10px grey;
  padding : 10px;
  width : 40%;
  margin : 10px;
  & h3 {
    border-bottom: 1px grey solid;
    padding-bottom: 10px;
  }

  & h4 {
    border-top: 1px grey solid;
    padding-top: 10px;
  }
  
  & button {
    width : 100%;
    height : 35px;
    background : grey;
    border : none;
    color : white;
  }
`


const Order = () => {

    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const Token = localStorage.getItem("accessToken");
    // useLocation으로 전달 받은 key호출
    const location = useLocation();
    const TotalCount = location.state.ItemTotalCount
    const ItemPrice = location.state.ItemPrice
    const ShippingFee = location.state.ItemShippingFee
    // 값의 계산식을 위하여 parseInt로 계산
    const TotalItemPrice = parseInt(ItemPrice) + parseInt(ShippingFee)
    
    useEffect(() => {
        axios
        .get("http://localhost:8080/users/mypage", { headers: { Authorization:  Token } })
        .then((response) => {
            setData(response.data);
            setName(data.name)
            setPhoneNumber(data.phoneNumber)
            setAddress(data.address)
        })
        .catch((error) => {
            alert(error);
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();


        const formData = {
            name, phoneNumber, address
        }

        axios
        .post("http://localhost:8080/order", { ...formData }, { headers: { Authorization: Token } })
        .then((res) => {
            console.log(res.data)
            alert("주문완료!")
            navigate('/orderComplete')
        })
        .catch((error) => {
            console.log(error)
            alert('에러가 발생했습니다. 다시 시도해 주세요.');
        });
    }



    return  <Container onSubmit={submitHandler}>
        <OrderInfo>
            <h3>배송지 정보</h3>
            <label>
                {/* placeholder로 정보를 보이게 한 후 같은 값의 value를 post로 전송 */}
                <h6>이름</h6>
                <input type="text" placeholder = {JSON.stringify(data.name)}/>
            </label>
            <label>
                <h6>연락처</h6>
                <input type="tel" placeholder = {JSON.stringify(data.phoneNumber)}/>
            </label>
            <label>
                <h6>주소</h6>
                <input type="text" placeholder = {JSON.stringify(data.address)}/>
            </label>
        </OrderInfo>
        <PaymentInfo>
            {/* 풀어서 전달된 값을 저장한 후 formatCurrency */}
            <h3>결제정보</h3>
            <h5>상품수   {TotalCount} 개</h5>
            <h5>상품금액  {formatCurrency(ItemPrice)}원</h5>
            <h5>배송비  {formatCurrency(ShippingFee)}원</h5>
            <h4>총 결제금액 {formatCurrency(TotalItemPrice)}원</h4>
            <button>구매하기</button>
        </PaymentInfo>
    </Container>
}

export default Order;