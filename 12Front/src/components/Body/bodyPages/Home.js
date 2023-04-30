import React from 'react'
import styled from 'styled-components';
import {Button, Container} from 'react-bootstrap';
import BodySlides from '../bodySlides';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style = {{
      padding : '1em'
    }}>
      <Container className="d-flex flex-column min-vh-50">
          <BodySlides />
          <div className = "d-flex justify-content-around"
          style = {{
            padding : '3em'
          }}>
          <Button onClick = {(e) => {
                        e.preventDefault();
                        navigate('/categories/6')
                    }} variant="success"
          style = {{
            height : '100px',
            width : '100px'
          }}><p style = {{
            padding : '20px 0 0 0'
          }}>생활</p></Button>{' '}
          <Button onClick = {(e) => {
                        e.preventDefault();
                        navigate('/categories/7')
                    }} variant="danger"
          style = {{
            height : '100px',
            width : '100px'
          }}><p style = {{
            padding : '20px 0 0 0'
          }}>스포츠</p></Button>{' '}
          <Button onClick = {(e) => {
                        e.preventDefault();
                        navigate('/categories/8')
                    }} variant="warning"
          style = {{
            height : '100px',
            width : '100px'
          }}><p style = {{
            padding : '20px 0 0 0'
          }}>패션</p></Button>{' '}
          <Button onClick = {(e) => {
                        e.preventDefault();
                        navigate('/categories/9')
                    }} variant="dark"
          style = {{
            height : '100px',
            width : '100px'
          }}><p style = {{
            padding : '20px 0 0 0'
          }}>육아</p></Button>{' '}
          <Button onClick = {(e) => {
                        e.preventDefault();
                        navigate('/categories/21')
                    }} variant="info"
          style = {{
            height : '100px',
            width : '100px'
          }}><p style = {{
            padding : '20px 0 0 0'
          }}>가구</p></Button>{' '}
          </div>
      </Container>
    </div>
  )
}

export default Home