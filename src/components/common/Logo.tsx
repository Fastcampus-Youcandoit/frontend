import styled from "styled-components";
import logo from "../../assets/icons/header_icon/logo.png";

const LogoBox = styled.div`
  width: 150px;
  height: 50%;

  @media (max-width: 425px) {
    width: 120px;
  }
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Logo = () => {
  return (
    <LogoBox>
      <LogoImg src={logo} alt="youcandoit logo" />
    </LogoBox>
  );
};

export default Logo;
