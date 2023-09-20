import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../assets/fonts/Font.css";
import gelleryBlack from "../../assets/icons/header_icon/header_gellery_black_icon.png";
import wikiBlack from "../../assets/icons/header_icon/header_wiki_black_icon.png";
import noticeBlack from "../../assets/icons/header_icon/header_notice_icon.png";
import CommuteButtonComponent from "../commute/CommuteButtonComponent";
import Logo from "./Logo";

const HeaderBox = styled.header`
  height: 9vh;
  padding: 0 2rem;
`;

const HeaderNav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderItems = styled.nav`
  display: flex;
  height: 50%;
  gap: 1.5rem;
  font-family: "SUITE-Medium";
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

const StyledLink = styled(Link)`
  color: #000;
`;

const Header = () => {
  return (
    <HeaderBox>
      <HeaderNav>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
        <HeaderItems>
          <HeaderItem>
            <IconImg src={noticeBlack} alt="notice icon" />
            <Span>
              <StyledLink to="/notice">notice</StyledLink>
            </Span>
          </HeaderItem>
          <HeaderItem>
            <IconImg src={wikiBlack} alt="wiki icon" />
            <Span>
              <StyledLink to="/wiki/office-life/company-rules">wiki</StyledLink>
            </Span>
          </HeaderItem>
          <HeaderItem>
            <IconImg src={gelleryBlack} alt="gellery icon" />
            <Span>
              <StyledLink to="/gallery/all">gallery</StyledLink>
            </Span>
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
