import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";


const Container = styled.div`
    padding : 10px 80px;
    display : flex;
    flex-direction : column;
    & a {
        text-decoration : none;
        color : black;
    }
`

const TitleDiv = styled.div`
    border-bottom : 1px solid gray;
    padding-bottom : 10px;
    font-size : 40px;
    font-weight : bold;

`

const ListDiv = styled.div`
    align-self : center;

`

const ItemDiv = styled.div`
    display : flex;
    margin : 10px;
    padding : 10px;
    & button {
        border : none;
        background-color : gray;
        color : white;
        margin : 10px;
    }

`

const NameDiv = styled.div`
    padding : 10px;
    font-weight : bold;
    font-size : 20px;

`

const DecsDiv = styled.div`
    padding : 10px;

`
const AdminProducts = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("adminToken");
    const [items, setItems] = useState([])
    const { categoryId } = useParams();


    useEffect(() => {
        axios
            .get(`http://localhost:8080/products/all/${categoryId}`)
            .then((response) => {
                setItems(response.data.searchAll)
            })
            .catch((error) => {
                alert(error)
            })
    }, [])


    const deleteHandler = (e)=>{
        console.log(e.target.id);
        axios
        .delete(`http://localhost:8080/products/delete/${e.target.id}`, { headers: { Authorization: token } })
        .then((response) => {
            alert("상품 삭제 완료")
            window.location.href = `/adminProducts/${categoryId}`;  
        })
        .catch((error) => {
          alert(error);
        });

    }

    const editHandler = (e)=> {
        navigate(`/editProduct/${e.target.id}`)
    
    }


    return (
        <Container>
            <TitleDiv>상품 관리</TitleDiv>
            <Link to="/addProduct">상품 추가</Link>
            <ListDiv>
                {items.map((item) => {
                    return <ItemDiv key={item.id}>
                            <NameDiv>{item.productName}</NameDiv>
                                <DecsDiv>{item.manufacturer}</DecsDiv>
                                <DecsDiv>{item.id}</DecsDiv>
                                <button id={item.id} onClick={editHandler}>수정</button>
                                <button id={item.id} onClick={deleteHandler}>삭제</button>
                    </ItemDiv>
                })}
            </ListDiv>
        </Container>
    )
}

export default AdminProducts;