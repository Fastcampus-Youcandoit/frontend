import React from "react";
import styled from "styled-components";

export const Span = styled.span`
  font-size: 1.3rem;
  padding-bottom: 0.2rem;
  width: 4rem;
`;

export const WorkOnMark = styled.img`
  width: 1rem;
  backgroun-color: black;
  position: relative;
  right: 1rem;
`;

export const CommuteButton = styled.button`
  background-color: #f6f7f9;
  height: 100%;
  border-radius: 10px;
  font-size: 1rem;
  padding: 0 2rem;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .commute_span {
    color: #00000;
    transition: all 0.3s ease 0s;

    &:hover {
      transform: scale(1.04);
    }
  }
  border: none;
`;

export const Modal = styled.div`
  box-sizing: border-box;
  padding: 1.5rem;
  position: absolute;
  z-index: 2000;
  height: 360px;
  width: 100%;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: white;

  @media (max-width: 768px) {
    max-width: 390px;
  }
`;

export const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const Header = styled.div`
  margin-bottom: 1.7rem;
  font-weight: bolder;

  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 2.1rem;
`;

export const TodayDate = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  font-size: 1.2rem;
  margin: 0.2rem 0;
`;

export const CurrentTimeLayout = styled.div`
  position: absolute;
  border: 1px solid #dcdcdc;
  width: 100%;
  border-radius: 10px;
  height: 150px;
  position: relative;
  top: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 5px;
`;

export const CurrentTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0.5rem 0;

  span {
    font-size: 1rem;
    font-weight: 800;
    background-color: #e6f7ff;
    color: #087ea4;
    padding: 2px 4px;
    border-radius: 5px;
  }
`;

export const Clock = styled.div<{ workonoff: boolean }>`
  font-size: 4rem;
  font-weight: 900;
  color: ${props => (props.workonoff ? "#087ea4" : "black")};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  button:disabled {
    font-size: 1rem;
    background-color: #f6f7f9;
    width: 150px;
    border-radius: 5px;
    margin-right: 0.7rem;
  }
`;

export const WorkOnOff = styled.button<{ workonoff: boolean }>`
  background-color:${props => (props.workonoff ? "#e6f7ff" : "white")};
  border:${props => (props.workonoff ? "none" : "1px solid #dcdcdc;")};
  border-radius: 5px;  
  width: 110px;
  font-size: 1rem;
  padding: 8px 0;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  &:hover {
    transform: scale(1.05);
  }
}`;

export const OkayButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2.2rem;
`;

export const OkayButton = styled.button<{ workonoff: boolean }>`
  color: ${props => (props.workonoff ? "#087ea4" : "white")};
  background-color: ${props => (props.workonoff ? "#e6f7ff" : "black")};
  border-radius: 5px;
  border: none;
  font-size: 1.3rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease 0s;

  &:hover {
    transform: scale(1.05);
  }
`;
