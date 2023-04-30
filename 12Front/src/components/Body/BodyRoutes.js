import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Favorites from "../Favorite/Favorites";
import logo from "../img/logo.png";
import Home from "./bodyPages/Home";
import CategoryComponents from "./bodyPages/CategoryComponents";
import RegisterForm from "../Register/RegisterForm";
import LoginForm from "../Login/LoginForm";
import ItemInfo from "./bodyPages/ItemInfo";
import Payments from "./bodyPages/Payments";
import Cart from "./bodyPages/Cart";
import Order from "./bodyPages/Order";
import OrderComplete from "./bodyPages/OrderComplete";
import OrderList from "./bodyPages/OrderList";
import UserMain from "../User/UserMain";
import UserInfo from "../User/UserInfo";
import UserUpdate from "../User/UserUpdate";
import AdminMain from "./Admin/AdminMain";
import AdminOrders from "./Admin/AdminOrders";
import AdminCategories from "./Admin/AdminCategories";
import AdminProducts from "./Admin/AdminProducts";
import AddCategory from "./Admin/AddCategory"
import AddProduct from "./Admin/AddProduct"
import EditCategory from "./Admin/EditCategory"
import EditProduct from "./Admin/EditProduct"
import UserDelete from "../User/UserDelete";
import DirectOrder from "./bodyPages/DirectOrder";
import DirectPayments from "./bodyPages/DirectPayment";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding : 0.5em;

  & a {
    text-decoration: none;
    color: black;
    padding : 1em;
  }

`;
const LogoDiv = styled.div`
  & img {
    width : 6em;
  }
  margin : 1.5em;
`;

const NavDiv = styled.div`
  align-self: center;
  list-style-type: none;
  
  & li {
    margin: 5px;
    display: inline;
    font-size : 1.3em;
    margin-top : 5px;
  }
`;

const IconDiv = styled.div`
  align-self: center;
  margin-left: auto;
  display : flex;
  list-style-type: none;
  & li {
    display: inline;
  }
  & span {
    font-size : 2em;
  }
`;

const BodyRoutes = () => {
  const Token = localStorage.getItem("accessToken");
  const AdminToken = localStorage.getItem("adminToken");
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      <Router>
        <Container>
          <LogoDiv>
            <NavLink to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
          </LogoDiv>
          <NavDiv>
            {categories.map((category) => {
              return (
                <li key={category.categoryId}>
                  {AdminToken || !AdminToken === "null" ? <></> : <NavLink to={`/categories/${category.categoryId}`}>{category.name}</NavLink> }
                </li>
              );
            })}
            {/* AdminToken이 admin값일때 관리자페이지 노출 */}
            {/* <></>이 아닌 다른 방법으로 노출을 조정할 수 있을지 고민 */}
            <li>{AdminToken || !AdminToken === "null" ? <NavLink to="/AdminMain">관리자페이지</NavLink> : <></>}</li>
          </NavDiv>
          <IconDiv>
            {/* admin일때 사람아이콘 출력 x , 유저일때 usermain, 비회원일때 loginForm >> 삼항 연산자에 삼항 연산자를 넣어서 코드의 가독성이 조금 떨어 질 것 같아서 고민 */}
            {AdminToken || !AdminToken === "null" ? (
              <></> 
            ) : (
              <li>
                {Token || !Token === "null" ? (
                  <div>
                  <NavLink to="/UserMain">
                    <span className="material-symbols-outlined">person</span>
                  </NavLink>
                  <NavLink to="/Favorites">
                  <span className="material-symbols-outlined" style = {{
                    margin : '10px'
                  }}>favorite</span>
                  </NavLink>
                  <NavLink to="/payments/cart">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  </NavLink>
                  </div>
                ) : (
                  <div>
                  <NavLink to="/LoginForm">
                    <span className="material-symbols-outlined">person</span>
                  </NavLink>
                  <NavLink to="/Favorites">
                  <span className="material-symbols-outlined" style = {{
                    margin : '10px'
                  }}>favorite</span>
                  </NavLink>
                  <NavLink to="/payments/cart">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  </NavLink>
                  </div>
                )}
              </li>
            )}
            <li>
              {AdminToken || !AdminToken === "null" ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("adminToken");
                    alert("관리자 로그아웃 되었습니다.");
                    window.location.href = "/";
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    borderColor: "white",
                    backgroundColor: "grey",
                    color: "white",
                  }}
                >
                  관리자 로그아웃
                </button>
              ) : ( <></>
              )}
            </li>
          </IconDiv>
        </Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/UserUpdate" element={<UserUpdate />} />
          <Route path="/UserDelete" element={<UserDelete />} />
          <Route path="/UserInfo" element={<UserInfo />} />
          <Route path="/UserMain" element={<UserMain />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/categories/:categoryId" element={<CategoryComponents />} />
          <Route path="/itemInfo/:id" element={<ItemInfo />} />
          <Route path="orderComplete" element={<OrderComplete />} />
          <Route path="/payments/*" element={<Payments />}>
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="/DirectPayments/*" element={<DirectPayments />}>
            <Route path="DirectOrder" element={<DirectOrder />} />
          </Route>
          {/* 관리자페이지 */}
          <Route path="/AdminMain" element={<AdminMain />} />
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/adminCategories" element={<AdminCategories />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/editCategory/:categoryId" element={<EditCategory />} />
          <Route path="/adminProducts/:categoryId" element={<AdminProducts />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
};

export default BodyRoutes;
