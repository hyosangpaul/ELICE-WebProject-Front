import React from "react";
import styled from "styled-components";

const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin : 20px;

`

const PageButton = styled.button`
    padding : 10px;
    border : none;


`

const Pagination = ({total, limit, page, setPage}) => {
    // 총 게시글 / 페이지당 게시글 수 올림 -> 필요한 페이지 수
    const numPages = Math.ceil( total / limit )

    return <PageDiv>
        <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </PageButton>
        {/* arrayLength(numPages) 만큼의 빈 슬롯을 가지는 것 -> fill로 값을 채움 */}
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        <PageButton onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </PageButton>
      </PageDiv>
}

export default Pagination;