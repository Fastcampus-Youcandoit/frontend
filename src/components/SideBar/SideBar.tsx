import "../../assets/fonts/Font.css";
import styled from "styled-components";
import companyBlack from "../../assets/icons/sidebar_icon/company_black_icon.png";
import companyBlue from "../../assets/icons/sidebar_icon/company_blue_icon.png";
import bottomBlack from "../../assets/icons/sidebar_icon/bottom_black_icon.png";
import bottomBlue from "../../assets/icons/sidebar_icon/bottom_blue_icon.png";
import projectBlack from "../../assets/icons/sidebar_icon/project_black_icon.png";
import projectBlue from "../../assets/icons/sidebar_icon/project_blue_icon.png";
import onbordingBlack from "../../assets/icons/sidebar_icon/onboarding_black_icon.png";
import onbordingBlue from "../../assets/icons/sidebar_icon/pnboarding_blue_icon.png";

const SideBarBox = styled.div`
  width: 300px;
  height: 90vh;
  font-family: "NotoSansKR-Regular";
`;

const SideBarItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.p`
  display: flex;
`;

const SideBarMainTextBlue = styled.section`
  height: 3rem;
  background-color: #e6f7ff;
  padding-left: 2.5rem;
  border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideBarMainTextBlack = styled.section`
  height: 3rem;
  padding-left: 2.5rem;
  border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainTextBlue = styled.span`
  font-size: 20px;
  margin-left: 12px;
  color: #087ea4;
  font-family: "NotoSansKR-Medium";
`;

const MainTextBlack = styled.span`
  font-size: 20px;
  margin-left: 12px;
  font-family: "NotoSansKR-Medium";
`;

const Text = styled.span`
  height: 3rem;
  font-size: 17px;
  padding-left: 4.7rem;
  display: flex;
  align-items: center;
`;

const CompanyIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 1px;
`;

const BottomIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 20px;
`;

const SideBar = () => {
  return (
    <SideBarBox>
      <SideBarItem>
        <SideBarMainTextBlue>
          <Section>
            <CompanyIcon src={companyBlue} alt="companyBlack icon" />
            <MainTextBlue>회사생활</MainTextBlue>
          </Section>
          <BottomIcon src={bottomBlue} alt="bottomBlue icon" />
        </SideBarMainTextBlue>
        <Text>회사내규</Text>
        <Text>팀소개</Text>
        <Text>조직도</Text>
      </SideBarItem>
      <SideBarItem>
        <SideBarMainTextBlack>
          <Section>
            <CompanyIcon src={projectBlack} alt="projectBlack icon" />
            <MainTextBlack>프로젝트</MainTextBlack>
          </Section>
          <BottomIcon src={bottomBlack} alt="bottomBlack icon" />
        </SideBarMainTextBlack>
        <Text>진행중인 프로젝트</Text>
        <Text>예정된 프로젝트</Text>
        <Text>완료된 프로젝트</Text>
      </SideBarItem>
      <SideBarItem>
        <SideBarMainTextBlack>
          <Section>
            <CompanyIcon src={onbordingBlack} alt="onbordingBlack icon" />
            <MainTextBlack>온보딩</MainTextBlack>
          </Section>
          <BottomIcon src={bottomBlack} alt="bottomBlack icon" />
        </SideBarMainTextBlack>
      </SideBarItem>
    </SideBarBox>
  );
};

export default SideBar;
