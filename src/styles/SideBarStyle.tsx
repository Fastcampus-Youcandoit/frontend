import styled from "styled-components";

const SideBarBox = styled.div`
  width: 30rem;
  height: 90vh;
  margin: 15px 50px 0 0;
  font-family: "NotoSansKR-Regular";
`;

const SideBarItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.p`
  display: flex;
  align-items: center;
`;

const SideBarMainText = styled.div`
  height: 4rem;
  background-color: #fff;
  padding-left: 2.5rem;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f6f7f9;
  }

  &:true {
    background-color: #e6f7ff;
  }
`;

const MainText = styled.span`
  font-size: 21px;
  margin-left: 20px;
  font-family: "NotoSansKR-Medium";
`;

const Text = styled.div`
  height: 3.5rem;
  font-size: 18px;
  padding-left: 5.5rem;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000;

  &:hover {
    background-color: #f6f7f9;
  }
`;

const CompanyIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
`;

const BottomIcon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 20px;
  transform: rotate(-90deg);
  transition: transform 0.3s ease;
  &.rotate {
    transform: rotate(0deg);
  }
`;

export {
  SideBarBox,
  SideBarItem,
  Section,
  SideBarMainText,
  MainText,
  Text,
  CompanyIcon,
  BottomIcon,
};
