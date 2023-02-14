import React, {useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
    padding : 10px 80px; 
    border : 1px black solid;
    & label {
        display : block;

    }


`

const EditCategory = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState('')
    const {categoryId} = useParams();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    const token = localStorage.getItem("adminToken");

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/categories/${categoryId}`)
        .then((response) => {
            setCategory(response.data.searchOne)
            setName(category.name)
            setDescription(category.description)
        })
        .catch((error) => {
          alert(error)
        })
    },[])


    const clickHandler = ()=>{

        const formData = {
            name,
            description
          }
        
        axios
        .post(`http://localhost:8080/categories/edit/${categoryId}`, { ...formData }, { headers: { Authorization: token } })
        .then(() => {
          alert('카테고리 수정 완료')
          navigate("/adminCategories")
        })
        .catch((err) => {
          alert(err)
        })

    }




    return (
        <Container>
            <label>
                <h6>카테고리명</h6>
                <input type="text" name="name" defaultValue={category.name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
                <h6>카테고리 설명</h6>
                <input type="text" name="description" defaultValue={category.description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <button onClick={ clickHandler }>카테고리 수정하기</button>
        </Container>
    )
}

export default EditCategory;