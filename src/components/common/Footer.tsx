import styled from "styled-components";
import github from "../../assets/icons/header_icon/header_github_black_icon.png";
import logo from "../../assets/icons/header_icon/logo.png";

const FooterBox = styled.footer`
  width: 100vw;
  position: fixed;
  bottom: 0;
  height: 5rem;
  padding: 1rem 4rem 0 4rem;
  border-top: 1px solid #707070;
  display: flex;
  justify-content: space-between;
`;

const GithubIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const FooterItemsBox = styled.div`
  font-size: 0.8rem;
  padding-top: 0.1rem;
  height: 1.5rem;
  display: flex;
`;

const FooterLogoBox = styled.div`
  display: flex;
`;

const FooterTeamInfo = styled.div`
  display: flex;
  margin-left: 1rem;
  padding-top: 0.25rem;
  > div:not(:last-child)::after {
    content: "|";
    margin: 0 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterBox>
      <FooterItemsBox>
        <FooterLogoBox>
          <img src={logo} alt="footer logo" />
        </FooterLogoBox>
        <FooterTeamInfo>
          <div>조장: 어준혁</div>
          <div>조원: 박지성, 이연수, 채민석, 장영민</div>
          <div>패스트캠퍼스X야놀자 개발 부트캠프_토이프로젝트</div>
        </FooterTeamInfo>
      </FooterItemsBox>
      <GithubIcon src={github} alt="footer github logo" />
    </FooterBox>
  );
};

export default Footer;
