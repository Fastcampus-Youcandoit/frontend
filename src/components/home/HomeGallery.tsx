import styled from "styled-components";
import chevronL from "../../assets/images/chevron/chevron_left.png";
import chevronR from "../../assets/images/chevron/chevron_right.png";

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

const HeaderContentContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SectionHeaderTitle = styled.div`
  font-size: 1.2rem;
`;

const SectionHeaderDesc = styled.div`
  font-size: 0.8rem;
  font-family: "NotoSansKR-Medium";
  padding-top: 0.2rem;
`;

const SectionButtonBox = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const SectionButton = styled.button`
  background-color: #f6f7f9;
  border-radius: 5px;
  border: none;
  padding: 0.2rem;
  height: 1.5rem;
  cursor: pointer;
`;

const SectionButtonImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: #f6f7f9;
`;

const HomeGallery = () => {
  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderContentContainer>
          <SectionHeaderTitle>gallery</SectionHeaderTitle>
          <SectionHeaderDesc>youcandoit 관련 갤러리 입니다.</SectionHeaderDesc>
        </HeaderContentContainer>
        <SectionButtonBox>
          <SectionButton type="button">
            <SectionButtonImg src={chevronL} />
          </SectionButton>
          <SectionButton type="button">
            <SectionButtonImg src={chevronR} />
          </SectionButton>
        </SectionButtonBox>
      </SectionHeader>
    </SectionContainer>
  );
};

export default HomeGallery;
