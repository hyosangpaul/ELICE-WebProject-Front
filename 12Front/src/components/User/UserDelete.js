import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import styled from "styled-components";

const UserDelete = () => {
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { password };
    const onSubmit = () => {
      axios
        .post("http://localhost:8080/users/delete/:userId", { ...formData }, { headers: { Authorization: token } })
        .then((res) => {
          console.log(res)
          localStorage.removeItem("accessToken")
          alert("회원 탈퇴 되었습니다.")
          window.location.href = "/"
        })
        .catch((err) => {
          console.log(err)
          alert('에러가 발생했습니다. 다시 시도해주세요.')
        })
    };
    onSubmit();
  };

  return (
    <div style={{ margin: "20%" }}>
      <Delete>
        <FloatingLabel controlId="floatingPassword" label="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}>
          <Form.Control type="password" />
        </FloatingLabel>
        <div
          style={{
            margin: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            style={{
              padding: "8px",
              borderRadius: "8px",
              borderColor: "white",
              backgroundColor: "red",
              color: "white",
            }}
          >
            회원 탈퇴
          </Button>
        </div>
      </Delete>
    </div>
  );
};

const Delete = styled.div`
  display: flex;
  justify-content: center;
`;

export default UserDelete;
