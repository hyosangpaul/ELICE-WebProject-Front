import React from 'react'
import {Container, Navbar, Row, Col} from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" style = {{height : '100px'}}
    className="py-5 bg-dark mt-auto">
        <Container>
            <Row className="text-light">
                <Col style ={{fontSize : '10px', color : 'grey'}}>
                (주) 엘리스그룹 | 주소: 서울특별시 강남구 선릉로 433 (역삼동, 세방빌딩) 6층, 16층
                <br/>
                대표자 김재원 | 통신판매업 신고번호: 제2022-서울강남-04515호 | 사업자등록번호 581-88-00303 | 전화 070-4633-4851 | 이메일 kdt@elice.io
                <br/>
                Alice 콘텐츠의 저작권은 저작권자 또는 제공처에 있으며, 이를 무단 사용 및 도용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있음을 알려드립니다.<br/>
                © 2023 Alice Corp. All rights reserved.
                </Col>
            </Row>
        </Container>
    </Navbar>
  )
}

export default Footer