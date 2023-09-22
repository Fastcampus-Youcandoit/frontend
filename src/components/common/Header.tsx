/* eslint-disable no-restricted-globals */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../assets/fonts/Font.css";
import dropDownIcon from "../../assets/icons/header_icon/header_dropdown_icon.png";
import loginIcon from "../../assets/icons/header_icon/header_login_icon.png";
import logoutIcon from "../../assets/icons/header_icon/header_logout_icon.png";
import { HEADER_MENU_ITEMS } from "../../constants/dropDown";
import { useAuth } from "../../context/AuthContext";
import CommuteButtonComponent from "../commute/CommuteButtonComponent";
import Logo from "./Logo";
import Menu from "../../assets/icons/header_icon/hamburger_icon.png";
import CommuteModal from "../commute/CommuteModal";

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
  align-items: center;
  font-family: "SUITE-Medium";
`;

export const HeaderItem = styled.div`
  font-size: 1.1rem;
  font-family: "SUITE-bold";
  height: 100%;
  display: flex;
  justify-content: center;
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
  height: 1rem;
  .dropdown {
    width: 0.8rem;
  }

  @media (max-width: 1024px) {
    width: 0.9rem;
    height: 0.9rem;
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

const DropDownBox = styled.div`
  position: absolute;
  top: 110%;
  right: -1px;
  width: 10rem;
  background-color: #fff;
  box-shadow: 0px 3px 6px #00000029;
  z-index: 99;
  border-radius: 5px;
  padding: 1rem 1rem;
`;

const DropDownItemBox = styled.div`
  display: none;
  @media screen and (max-width: 1023px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-bottom: 2px solid #d2d2d2;
    height: 10rem;
    gap: 0.2rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.2rem;
  }
`;

const LogoutImg = styled.img`
  width: 1rem;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const DisAppear = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const Appear = styled.div`
  position: relative;
  display: none;
  @media screen and (max-width: 1023px) {
    display: flex;
    justify-content: flex-start;
    width: 2rem;
    height: 2rem;
  }
`;

const LoginedBox = styled.div`
  position: relative;
`;

const UnloginedBox = styled.div`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const MenuImg = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Header = () => {
  const { currentUser, logout } = useAuth(); // 현재 사용자 정보 가져오기
  const userName = currentUser?.displayName;
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [workingHours, setWorkingHours] = useState<string>("0");
  const [workonoff, setWorkonoff] = useState<boolean>(false);
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
          <DisAppear>
            <HeaderItem className="commute">
              {currentUser && (
                <CommuteButtonComponent
                  setWorkingHours={setWorkingHours}
                  workonoff={workonoff}
                  setModalOpen={setModalOpen}
                  setWorkonoff={setWorkonoff}
                  $isIcon
                />
              )}
            </HeaderItem>
            {HEADER_MENU_ITEMS.map(item => (
              <HeaderItem key={item.id}>
                <IconImg src={item.icon} alt={item.alt} />
                <Span>
                  <StyledLink to={item.path}>{item.name}</StyledLink>
                </Span>
              </HeaderItem>
            ))}
          </DisAppear>
          <div>
            {currentUser && (
              <HeaderItem>
                <LoginedBox
                  ref={dropdownRef}
                  onClick={() => setIsDrop(!isDrop)}>
                  <Name type="button">{userName} 님</Name>
                  <IconImg
                    className="dropdown"
                    src={dropDownIcon}
                    alt="dropdown icon"
                  />
                  {isDrop && (
                    <DropDownBox>
                      <DropDownItemBox>
                        <HeaderItem className="commute">
                          {currentUser && (
                            <CommuteButtonComponent
                              setWorkingHours={setWorkingHours}
                              workonoff={workonoff}
                              setWorkonoff={setWorkonoff}
                              setModalOpen={setModalOpen}
                              $isIcon={false}
                            />
                          )}
                        </HeaderItem>
                        {HEADER_MENU_ITEMS.map(item => (
                          <HeaderItem key={item.id}>
                            <StyledLink to={item.path}>{item.name}</StyledLink>
                          </HeaderItem>
                        ))}
                      </DropDownItemBox>
                      <HeaderItem onClick={handleLogout}>
                        <LogoutImg src={logoutIcon} alt="logout icon" />
                        logout
                      </HeaderItem>
                    </DropDownBox>
                  )}
                </LoginedBox>
              </HeaderItem>
            )}
            {!currentUser && (
              <UnloginedBox>
                <HeaderItem>
                  <IconImg src={loginIcon} alt="gellery icon" />
                  <Span>
                    <StyledLink to="/login">login</StyledLink>
                  </Span>
                </HeaderItem>
              </UnloginedBox>
            )}
          </div>
          {!currentUser && (
            <Appear ref={dropdownRef} onClick={() => setIsDrop(!isDrop)}>
              <MenuImg src={Menu} />
              {isDrop && (
                <DropDownBox>
                  <DropDownItemBox>
                    {HEADER_MENU_ITEMS.map(item => (
                      <HeaderItem key={item.id}>
                        <StyledLink to={item.path}>{item.name}</StyledLink>
                      </HeaderItem>
                    ))}
                  </DropDownItemBox>
                  <HeaderItem>
                    <Span>
                      <StyledLink to="/login">login</StyledLink>
                    </Span>
                  </HeaderItem>
                </DropDownBox>
              )}
            </Appear>
          )}
        </HeaderItems>
      </HeaderNav>
      <CommuteModal
        modalOpen={modalOpen}
        workonoff={workonoff}
        setWorkonoff={setWorkonoff}
        setModalOpen={setModalOpen}
        workingHours={workingHours}
      />
    </HeaderBox>
  );
};

export default Header;
