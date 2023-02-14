import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    padding : 10px 80px; 
    & label {
        display : block;

    }

`



const AddProduct = () => {
    
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [detailDesc, setDetailDesc] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [totalstocks, setTotalstocks] = useState('');
    const [price, setPrice] = useState('');
    const [searchKeywords, setSearchKeywords] = useState('');
    const [discount, setDiscount] = useState(100);
    const [categories, setCategories] = useState([]);
    
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



    const clickHandler = ()=>{
        
        console.log(categoryId)

        const formData = {
            productName, 
            categoryId, 
            manufacturer, 
            shortDesc,
            detailDesc, 
            imgUrl, 
            totalstocks, 
            price, 
            searchKeywords, 
            discount
          }
        
        axios
        .post("http://localhost:8080/products/add", { ...formData }, { headers: { Authorization: token } })
        .then(() => {
          alert('상품 추가 완료')
          navigate("/adminCategories")
        })
        .catch((err) => {
          alert(err)
        })

    }
    
    return (
        <Container>
            <label>
                <h6>상품명</h6>
                <input type="text" name="productName" onChange={ (e) => setProductName(e.target.value)}/>
            </label>
            <label>
                <h6>카테고리명</h6>
                {/* <select name="categoryId" id="">
                    {categories.map((category)=>{
                        return <option key={category.categoryId} onChange={ (e) => setCategoryId(e.target.value)} 
                        value={category.name} >{category.name}</option>
                    })}
                </select> */}
                <input type="text" name="categoryId" onChange={ (e) => setCategoryId(e.target.value)}/>
            </label>
            <label>
                <h6>제조사</h6>
                <input type="text" name="manufacturer" onChange={ (e) => setManufacturer(e.target.value)}/>
            </label>
            <label>
                <h6>상품 설명 이미지 URL</h6>
                <input type="text" name="shortDesc" onChange={ (e) => setShortDesc(e.target.value)}/>
            </label>
            <label>
                <h6>배송 정보 이미지 URL</h6>
                <input type="text" name="detailDesc" onChange={ (e) => setDetailDesc(e.target.value)}/>
            </label>
            <label>
                <h6>썸네일 이미지 URL</h6>
                <input type="text" name="imgUrl" onChange={ (e) => setImgUrl(e.target.value)}/>
            </label>
            <label>
                <h6>재고</h6>
                <input type="number" name="totalstocks" onChange={ (e) => setTotalstocks(e.target.value)}/>
            </label>
            <label>
                <h6>가격</h6>
                <input type="number" name="price" onChange={ (e) => setPrice(e.target.value)}/>
            </label>
            <label>
                <h6>검색 키워드</h6>
                <input type="text" name="searchKeywords" onChange={ (e) => setSearchKeywords(e.target.value)}/>
            </label>
            <label>
                <h6>할인율</h6>
                <input type="text" name="discount" onChange={ (e) => setDiscount(e.target.value)}/>
            </label>



            <button onClick={ clickHandler }>상품추가하기</button>
        </Container>
    )
}


export default AddProduct;