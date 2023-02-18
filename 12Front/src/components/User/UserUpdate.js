import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const UserUpdate = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState("");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleUpdSubmit = (e) => {
    // 새로고침 방지
    e.preventDefault();

    const formUpdData = {
      email,
      phoneNumber,
      address,
    };
    const onUpdSubmit = () => {
      // formUpdData로 묶은 값을 구조분해해서 전달
      // post로 회원 정보 변경

      axios
        .post("http://localhost:8080/users/edit/:userId", { ...formUpdData }, { headers: { Authorization: token } })
        .then((res) => {
          console.log(res)
          alert("회원 정보가 수정되었습니다.")
          navigate("/UserInfo")
        })
        .catch((err) => {
          console.log(err)
          alert('에러가 발생했습니다. 다시 시도해주세요.')
        })
    };
    onUpdSubmit();
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/mypage", { headers: { Authorization: token } })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error)
        alert('에러가 발생했습니다. 다시 시도해주세요.')
      });
  }, []);

  return (
    <Update>
      <Form style={{ width: 600 }}>
        {/* 아이디 */}
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={JSON.stringify(data.email)}
              defaultValue=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* 전화번호 */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={JSON.stringify(data.phoneNumber)}
              defaultValue=""
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* 주소 */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>주소</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={JSON.stringify(data.address)}
              defaultValue=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <BtnDiv>
          <Button
            type="submit"
            style={{
              backgroundColor: "grey",
              border: "grey",
            }}
            onClick={handleUpdSubmit}
          >
            정보 수정
          </Button>
        </BtnDiv>
      </Form>
    </Update>
  );
};

const Update = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 150px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default UserUpdate;
