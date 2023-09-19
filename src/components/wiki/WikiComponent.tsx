import { useState } from "react";
import styled from "styled-components";
import writeIcon from "../../assets/icons/wiki_icon/wiki_write_icon.png";

const WikiContentBox = styled.div`
  width: 75vw;
  font-family: "NotoSansKR-Regular";
`;

const WikiHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

const WikiMainText = styled.span`
  font-size: 25px;
  font-family: "NotoSansKR-bold";
`;

const WriteIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const WikiContent = styled.div`
  width: 100%;
  height: 70vh;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  background-color: #f6f7f9;
  margin-top: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`;

const WikiFooter = styled.div`
  margin-top: 10px;
`;

const ModificationDate = styled.span`
  font-size: 15px;
`;

const WikiComponent = () => {
  const [WikiMainTexts] = useState([
    "회사내규",
    "팀 소개",
    "조직도",
    "진행중인 프로젝트",
    "예정된 프로젝트",
    "완료된 프로젝트",
    "신입사원 필독서",
    "온보딩 주제",
  ]);
  return (
    <WikiContentBox>
      <WikiHeader>
        <WikiMainText>{WikiMainTexts[0]}</WikiMainText>
        <WriteIcon src={writeIcon} alt="글작성 아이콘" />
      </WikiHeader>
      <WikiContent>View</WikiContent>
      <WikiFooter>
        <ModificationDate>최종 수정일 : </ModificationDate>
      </WikiFooter>
    </WikiContentBox>
  );
};

export default WikiComponent;
