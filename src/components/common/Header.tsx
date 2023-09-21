/* eslint-disable no-restricted-globals */
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../assets/fonts/Font.css";
import gelleryBlack from "../../assets/icons/header_icon/header_gellery_black_icon.png";
import wikiBlack from "../../assets/icons/header_icon/header_wiki_black_icon.png";
import noticeIcon from "../../assets/icons/header_icon/header_notice_icon.png";
import dropDownIcon from "../../assets/icons/header_icon/header_dropdown_icon.png";
import loginIcon from "../../assets/icons/header_icon/header_login_icon.png";
import logoutIcon from "../../assets/icons/header_icon/header_logout_icon.png";
import CommuteButtonComponent from "../commute/CommuteButtonComponent";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";

const HeaderBox = styled.header`
  height: 9vh;
  padding: 0 2rem;
  border-bottom: 1px solid #707070;
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

export const HeaderItem = styled.div`
  font-size: 1.1rem;
  font-family: "SUITE-bold";
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.3rem;
  border-radius: 10px;
  transition: all 0.3s ease 0s;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    transition: all 0.3s;
  }
`;

export const IconImg = styled.img`
  width: 1rem;
  .dropdown {
    width: 0.8rem;
  }
`;

const Span = styled.span`
  padding-bottom: 0.2rem;
`;

const StyledLink = styled(Link)`
  color: #000;
  font-size: inherit;
`;

const Name = styled.button`
  margin-right: 3px;
  font-family: "SUITE-bold";
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.5s;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    transition: all 0.3s;
  }
`;

const Logout = styled.button`
  position: absolute;
  top: 60px;
  margin-left: -8px;
  padding: 15px;
  background-color: #fff;
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  cursor: pointer;
  z-index: 99;
`;

const Header = () => {
  const { currentUser, logout } = useAuth(); // 현재 사용자 정보 가져오기
  const userName = currentUser?.displayName;
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDrop(!isDrop);
      }
    };

    if (isDrop) {
      window.addEventListener("click", clickEvent);
    }

    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, [isDrop]);

  const handleLogout = async () => {
    try {
      if (confirm("로그아웃하시겠습니까?")) {
        await logout(); // 로그아웃 함수 호출
        alert("로그아웃되었습니다.");
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
          <HeaderItem>{currentUser && <CommuteButtonComponent />}</HeaderItem>
          <HeaderItem>
            <IconImg src={noticeIcon} alt="notice icon" />
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

          {currentUser ? (
            <HeaderItem>
              <div ref={dropdownRef}>
                <Name type="button" onClick={() => setIsDrop(!isDrop)}>
                  {userName} 님
                </Name>
                <IconImg
                  className="dropdown"
                  src={dropDownIcon}
                  alt="dropdown icon"
                />
              </div>

              {isDrop && (
                <Logout type="button" onClick={handleLogout}>
                  <HeaderItem>
                    <IconImg src={logoutIcon} alt="logout icon" />
                    logout
                  </HeaderItem>
                </Logout>
              )}
            </HeaderItem>
          ) : (
            <HeaderItem>
              <IconImg src={loginIcon} alt="gellery icon" />
              <Span>
                <StyledLink to="/login">login</StyledLink>
              </Span>
            </HeaderItem>
          )}
        </HeaderItems>
      </HeaderNav>
    </HeaderBox>
  );
};

export default Header;
