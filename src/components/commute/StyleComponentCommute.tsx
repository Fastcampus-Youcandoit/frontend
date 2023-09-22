import styled from "styled-components";
import "../../assets/fonts/Font.css";
import { Button } from "../gallery/GalleryModal";

export const Span = styled.span`
  font-size: 1.08rem;
  margin-right: 0.5rem;
  width: 4rem;
`;

export const WorkOnMark = styled.img`
  width: 0.6rem;
  margin-right: 0.4rem;
`;

export const CommuteButton = styled.button<{ $isIcon: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: ${props => (props.$isIcon ? "row" : "row-reverse")};
  background: none;
  border: none;
  padding: 0;
  gap: 0.2rem;
  transition: all 0.3s ease 0s;
  width: 100%;

  &:hover {
    transform: scale(1.05); /* "transform" 및 스케일 속성 수정 */
  }
`;

export const Modal = styled.div`
  box-sizing: border-box;
  padding: 2rem 3rem;
  position: absolute;
  z-index: 999;
  width: 100%;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
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
  z-index: 2000;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled.div`
  font-family: "NotoSansKR-Bold";
  margin-bottom: 1.6rem;
  font-weight: bolder;
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 2rem;
`;

export const TodayDate = styled.div`
  font-family: "NotoSansKR-Medium";
  display: flex;
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  margin: 0.2rem 0;
`;

export const CurrentTimeLayout = styled.div`
  width: 100%;
  padding: 2rem 0;
  position: absolute;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
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

export const Clock = styled.div<{ $workonoff: boolean | string }>`
  font-size: 4rem;
  font-weight: 900;
  font-family: "NotoSansKR-ExtraBold";
  color: ${props => (props.$workonoff ? "#087ea4" : "black")};
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

export const WorkOnOff = styled.button<{ $workonoff: boolean | string }>`
  background-color: ${props => (props.$workonoff ? "#e6f7ff" : "white")};
  border: ${props => (props.$workonoff ? "none" : "1px solid #dcdcdc;")};
  border-radius: 5px;
  width: 110px;
  font-size: 1rem;
  padding: 8px 0;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  color: ${props => (props.$workonoff ? "#087ea4" : "black")};
  &:hover {
    transform: scale(1.05);
  }
`;

export const OkayButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2.2rem;
`;

export const OkayButton = styled(Button)<{
  color: string;
  $borderColor: string;
  $backgroundColor: string;
  $workonoff: boolean | string;
}>`
  color: ${props => (props.$workonoff ? "#087ea4" : props.color)};
  background-color: ${props =>
    props.$workonoff ? "#e6f7ff" : props.$backgroundColor};
  border-radius: 10px;
  border: ${props => {
    if (props.$workonoff) {
      return "none";
    }
    if (props.$borderColor) {
      return `1px solid ${props.$borderColor}`;
    }
    return "none";
  }};
  font-size: 1.3rem;
  margin-left: 1rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease 0s;

  &:hover {
    transform: scale(1.05);
  }
`;
