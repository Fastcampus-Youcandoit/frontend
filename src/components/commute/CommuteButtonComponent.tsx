import React from "react";
import styled from "styled-components";
import cummute from "../../assets/icons/header_icon/header_commute_white-icon.png";

const IconImg = styled.img`
  width: 1rem;
`;

const Span = styled.span`
  padding-bottom: 0.2rem;
`;

const CommuteButton = styled.button`
  background-color: #000000;
  height: 100%;
  border-radius: 10px;
  font-size: 1rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  .commute_span {
    color: #ffff;
    margin-left: 0.5rem;
  }
`;

const CommuteButtonComponent = () => {
  return (
    <CommuteButton type="button">
      <IconImg src={cummute} />
      <Span className="commute_span">commute</Span>
    </CommuteButton>
  );
};

export default CommuteButtonComponent;
