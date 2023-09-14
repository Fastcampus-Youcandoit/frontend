import styled from "styled-components";
import gelleryBlack from "../../assets/icons/header_icon/header_gellery_black_icon.png";
import github from "../../assets/icons/header_icon/header_github_black_icon.png";
import wikiBlack from "../../assets/icons/header_icon/header_wiki_black_icon.png";
import Logo from "./Logo";
import CommuteButtonComponent from "../commute/CommuteButtonComponent";
import "../../assets/fonts/Font.css";

const HeaderBox = styled.header`
  width: 100vw;
  height: 9vh;
  padding: 0 2rem;
`;

const HeaderNav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderItems = styled.nav`
  display: flex;
  height: 50%;
  gap: 1.5rem;
`;

const HeaderItem = styled.div`
  font-size: 1rem;
  font-family: "SUITE-bold";
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.2rem;
  border-radius: 10px;
  .github {
    width: 2.2rem;
    height: 80%;
  }
`;

const IconImg = styled.img`
  width: 1rem;
`;

const Span = styled.span`
  padding-bottom: 0.2rem;
`;

const Header = () => {
  return (
    <HeaderBox>
      <HeaderNav>
        <Logo />
        <HeaderItems>
          <HeaderItem>
            <IconImg src={wikiBlack} alt="wiki icon" />
            <Span>wiki</Span>
          </HeaderItem>
          <HeaderItem>
            <IconImg src={gelleryBlack} alt="gellery icon" />
            <Span>gellery</Span>
          </HeaderItem>
          <HeaderItem>
            <IconImg src={github} alt="github icon" className="github" />
          </HeaderItem>
          <HeaderItem>
            <CommuteButtonComponent />
          </HeaderItem>
        </HeaderItems>
      </HeaderNav>
    </HeaderBox>
  );
};

export default Header;
