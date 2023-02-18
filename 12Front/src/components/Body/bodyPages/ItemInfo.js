import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { WISHLIST_KEY } from '../../../constants/key'
import { CARTLIST_KEY } from '../../../constants/key'
//key.js에서 WISHLIST_KEY설정
const Container = styled.form`
    align-items : center;
    padding : 20px;
    
    `
const ProductImg = styled.div`
    display : flex;
    flex-grow: 1;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`
const DetailImg = styled.div`
    width : 100px;

`
const Wrapper = styled.div`
    padding : 10px;
    width : 50%;
`

const ManufacturerInput = styled.input`
    display : block;
    width : 30%;
    margin : 10px;
    border : none;

`

const ProductInput = styled.input`
    display : block;
    width : 30%;
    margin : 10px;
    border : none;
    font-size : 30px;


`

const PriceInput = styled.input`
    display : block;
    width : 30%;
    margin : 10px;
    border : none;
    font-size : 30px;
    font-weight : bold;


`
const SkuDiv = styled.div`
    margin : 10px;
`
const ButtonWrapper = styled.div`
    & button {
        color : white;
        background : grey;
        border : grey;
        width :30%;
        margin : 10px;
    }

`


const Details = () => {
    
    const [data, setData] = useState('');
    const [count, setCount] = useState(1);
    const { id } = useParams();
    const Token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const ChanegeHandler = (e)=>{
        setCount(e.target.value) 
        
    }

    useEffect(() => {
      axios
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setData(response.data.searchOne)
      })
      .catch((error) => {
        alert(error)
      })
    }, [])

    const clickCartHandler = () => {
        alert("장바구니 담기 완료!")
        const savedCartList = localStorage.getItem(CARTLIST_KEY)
        //'elice_wishlist' 값 가져오고
        const cartList = savedCartList ? JSON.parse(savedCartList) : []
        //wishList 는 elice_wishlist 있으면 JSON.parse 아니면 빈배열로 data.push
        cartList.push(data)
        localStorage.setItem(CARTLIST_KEY, JSON.stringify(cartList));
        //push 후 'elice_wishlist'로 다시 setItem
    }

       

    const clickWishHandler = () => {
        alert("찜하기 완료!")
        
        const savedWishList = localStorage.getItem(WISHLIST_KEY)

        const wishList = savedWishList ? JSON.parse(savedWishList) : []

        wishList.push(data)
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishList));
    }


    const SubmitHandler = (e) => {
        e.preventDefault();
        navigate('/payments/order')
    }

    return <Container onSubmit={SubmitHandler}>
        <ProductImg><img src={data.imgUrl} style = {{width : "430px"}}alt="상품이미지"/>
        <Wrapper>
            <ManufacturerInput type="text" name="manufacturer" value={data.manufacturer}/>
            <ProductInput type="text" name="productName" value={data.productName} />
            <PriceInput type="text" name="price" value={`${data.price}원`} />
            <SkuDiv><input type="number" name="sku" onChange={ChanegeHandler} defaultValue={count}/>&nbsp;개</SkuDiv>
            
            <ButtonWrapper>
                <button type="button" onClick={clickCartHandler}>장바구니 추가하기</button>
                 <button type="button" onClick={clickWishHandler}>찜하기</button>
                <button onClick = {() => {
                    Token || !Token === "null" ? navigate('/DirectPayments/DirectOrder') : navigate('/LoginForm')
                }}>바로 구매하기</button>
            </ButtonWrapper>
        </Wrapper>
        </ProductImg>
        <DetailImg><img src={data.shortDesc} style = {{width: "860px"}} alt="상품이미지"/></DetailImg>
    </Container>
}

export default Details;