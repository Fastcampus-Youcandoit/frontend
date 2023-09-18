import React, { useRef } from "react";
import styled from "styled-components";
import MarkdownEditor from "../components/wiki/MarkdownEditor";

const BackButton = styled.button`
  height: 100%;
  width: 40%;
  background-color: lightgray;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem 0 0 0.5rem;

  &:hover {
    background-color: gray;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;

const SubmitButton = styled.button`
  height: 100%;
  width: 60%;
  background-color: royalblue;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  border-radius: 0 0.5rem 0.5rem 0;

  &:hover {
    background-color: blue;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;

const ButtonContainer = styled.div`
  height: 3rem;
  margin-top: 1rem;
`;

const Wiki = () => {
  const editorRef = useRef(null);

  return (
    <>
      {/* 에디터 컴포넌트 추가 */}
      <MarkdownEditor content="" editorRef={editorRef} />
      {/* 뒤로가기 및 작성 버튼 추가 */}
      <ButtonContainer>
        <BackButton type="button">뒤로가기</BackButton>
        <SubmitButton type="submit">작성하기</SubmitButton>
      </ButtonContainer>
    </>
  );
};

export default Wiki;
