import styled from "styled-components";

const SectionContainer = styled.section`
  width: 50%;
  height: 100%;
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "NotoSansKR-Bold";
`;

const HeaderContentContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SectionHeaderTitle = styled.div`
  font-size: 1.2rem;
`;

const SectionButtonBox = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const SectionButton = styled.button`
  background-color: #f6f7f9;
  border-radius: 5px;
  border: none;
  padding: 0.3rem 0.4rem;
  cursor: pointer;
`;

const HomeCalendar = () => {
  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderContentContainer>
          <SectionHeaderTitle>2023년 9월 일정</SectionHeaderTitle>
        </HeaderContentContainer>
        <SectionButtonBox>
          <SectionButton type="button">{"<"}</SectionButton>
          <SectionButton type="button">{">"}</SectionButton>
        </SectionButtonBox>
      </SectionHeader>
    </SectionContainer>
  );
};

export default HomeCalendar;
