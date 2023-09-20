/* eslint-disable no-restricted-globals */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../assets/fonts/Font.css";
import gelleryBlack from "../../assets/icons/header_icon/header_gellery_black_icon.png";
import github from "../../assets/icons/header_icon/header_github_black_icon.png";
import wikiBlack from "../../assets/icons/header_icon/header_wiki_black_icon.png";
import CommuteButtonComponent from "../commute/CommuteButtonComponent";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";

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
  const { currentUser, logout } = useAuth(); // 현재 사용자 정보 가져오기
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (confirm("로그아웃하시겠습니까?")) {
        await logout(); // 로그아웃 함수 호출
        alert("로그아웃 되셨습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
  return (
    <HeaderBox>
      <HeaderNav>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
        <HeaderItems>
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
            <IconImg src={github} alt="github icon" className="github" />
          </HeaderItem>
          <HeaderItem>
            {currentUser && <CommuteButtonComponent />}
            {currentUser ? (
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <Link to="login">로그인</Link>
            )}
          </HeaderItem>
        </HeaderItems>
      </HeaderNav>
    </HeaderBox>
  );
};

export default Header;
