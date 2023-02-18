import React, {useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    padding : 10px 80px; 
    & label {
        display : block;

    }

`
const AddCategory = () => {
    
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem("adminToken");

    const clickHandler = ()=>{

        const formData = {
            name,
            description
          }
        
        axios
        .post("http://localhost:8080/categories/add", { ...formData }, { headers: { Authorization: token } })
        .then(() => {
          alert('카테고리 추가 완료')
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
                <input type="text" name="name" onChange={ (e) => setName(e.target.value)}/>
            </label>
            <label>
                <h6>카테고리설명</h6>
                <input type="text" name="description" onChange={ (e) => setDescription(e.target.value)}/>
            </label>
            <button onClick={ clickHandler }>카테고리 추가하기</button>
        </Container>
    )
}

export default AddCategory;