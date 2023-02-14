import React, { useState,useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

const AdminCategories = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("adminToken");



    useEffect(() => {
        axios
          .get(`http://localhost:8080/categories`)
          .then((response) => {
            setCategories(response.data.searchAll);
          })
          .catch((error) => {
            alert(error);
          });
      }, []);

    const deleteHandler = (e)=>{
        console.log(e.target.id);
        axios
        .delete(`http://localhost:8080/categories/delete/${e.target.id}`, { headers: { Authorization: token } })
        .then((response) => {
            alert("카테고리 삭제 완료")
            window.location.href = "/adminCategories";  
        })
        .catch((error) => {
          alert(error);
        });

    }

    const editHandler = (e)=> {
        navigate(`/editCategory/${e.target.id}`)
    }

    return (
        <Container>

            <TitleDiv>카테고리 관리</TitleDiv>
            <Link to="/addCategory">카테고리 추가</Link>
            <ListDiv>
                {categories.map((category)=>{
                    return <ItemDiv key={category.categoryId}>
                        <Link to={`/adminProducts/${category.categoryId}`}>
                            <NameDiv>{category.name}</NameDiv>
                        </Link>
                        <DecsDiv>{category.description}</DecsDiv>
                        <button id={category.categoryId} onClick={ editHandler }>수정</button>
                        <button id={category.categoryId} onClick={ deleteHandler }>삭제</button>
                    </ItemDiv>
                })}
            </ListDiv>
        </Container>
    )

}

export default AdminCategories;