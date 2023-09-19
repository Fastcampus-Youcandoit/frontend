import styled from "styled-components";

const SectionContainer = styled.section`
  width: 50%;
  height: 20rem;
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1.2px solid #d2d2d2;
  font-family: "SUITE-Bold";
  padding-bottom: 0.5rem;
`;

const SectionHeaderTitle = styled.div`
  font-size: 1.2rem;
`;

const SectionButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const SectionButton = styled.button`
  border-radius: 5px;
  border: none;
  height: rem;
  cursor: pointer;
  font-family: "NotoSansKR-Medium";
`;

const HomeNotice = () => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionHeaderTitle>공지사항</SectionHeaderTitle>
        <SectionButtonBox>
          <SectionButton type="button">전체보기</SectionButton>
        </SectionButtonBox>
      </SectionHeader>
    </SectionContainer>
  );
};

export default HomeNotice;
