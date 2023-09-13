import "../../assets/fonts/Font.css";
import { useState } from "react";
import styled from "styled-components";
import companyBlack from "../../assets/icons/sidebar_icon/company_black_icon.png";
import companyBlue from "../../assets/icons/sidebar_icon/company_blue_icon.png";
import bottomBlack from "../../assets/icons/sidebar_icon/bottom_black_icon.png";
import bottomBlue from "../../assets/icons/sidebar_icon/bottom_blue_icon.png";
import projectBlack from "../../assets/icons/sidebar_icon/project_black_icon.png";
import projectBlue from "../../assets/icons/sidebar_icon/project_blue_icon.png";
import onbordingBlack from "../../assets/icons/sidebar_icon/onboarding_black_icon.png";
import onbordingBlue from "../../assets/icons/sidebar_icon/onboarding_blue_icon.png";

const SideBarBox = styled.div`
  width: 400px;
  height: 90vh;
  margin-top: 15px;
  font-family: "NotoSansKR-Regular";
`;

const SideBarItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.p`
  display: flex;
  align-items: center;
`;

const SideBarMainTextBlue = styled.a`
  height: 4rem;
  background-color: #e6f7ff;
  padding-left: 2.5rem;
  border: none;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideBarMainTextBlack = styled.a`
  height: 4rem;
  background-color: #fff;
  padding-left: 2.5rem;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f6f7f9;
  }
`;

const MainTextBlue = styled.span`
  font-size: 21px;
  margin-left: 20px;
  color: #087ea4;
  font-family: "NotoSansKR-Medium";
`;

const MainTextBlack = styled.span`
  font-size: 21px;
  margin-left: 20px;
  font-family: "NotoSansKR-Medium";
`;

const Text = styled.a`
  height: 3.5rem;
  font-size: 18px;
  padding-left: 5.5rem;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f6f7f9;
  }
`;

const CompanyIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
`;

const BottomIcon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 20px;
  transform: rotate(-90deg);
  transition: transform 0.3s ease;
  &.rotate {
    transform: rotate(0deg);
  }
`;

const WikiSideBar = () => {
  const [CompanyTextVisible, setCompanyTextVisible] = useState(false);
  const [ProjectTextVisible, setProjectTextVisible] = useState(false);
  const [OnboardingTextVisible, setOnboardingTextVisible] = useState(false);
  const [CompanyIconRotation, setCompanyIconRotation] = useState(false);
  const [ProjectIconRotation, setProjectIconRotation] = useState(false);
  const [OnboardingIconRotation, setOnboardingIconRotation] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const ToggleCompanyText = () => {
    setCompanyTextVisible(!CompanyTextVisible);
    setCompanyIconRotation(!CompanyIconRotation);
  };

  const ToggleProjectText = () => {
    setProjectTextVisible(!ProjectTextVisible);
    setProjectIconRotation(!ProjectIconRotation);
  };

  const ToggleOnboardingText = () => {
    setOnboardingTextVisible(!OnboardingTextVisible);
    setOnboardingIconRotation(!OnboardingIconRotation);
  };

  return (
    <SideBarBox>
      <SideBarItem>
        <SideBarMainTextBlue onClick={ToggleCompanyText}>
          <Section>
            <CompanyIcon src={companyBlue} alt="companyBlack 아이콘" />
            <MainTextBlue>회사생활</MainTextBlue>
          </Section>
          <BottomIcon
            src={bottomBlue}
            alt="bottomBlue 아이콘"
            className={CompanyIconRotation ? "rotate" : ""}
          />
        </SideBarMainTextBlue>
        {CompanyTextVisible && (
          <>
            <Text>회사내규</Text>
            <Text>팀소개</Text>
            <Text>조직도</Text>
          </>
        )}
      </SideBarItem>
      <SideBarItem>
        <SideBarMainTextBlack onClick={ToggleProjectText}>
          <Section>
            <CompanyIcon src={projectBlack} alt="projectBlack 아이콘" />
            <MainTextBlack>프로젝트</MainTextBlack>
          </Section>
          <BottomIcon
            src={bottomBlack}
            alt="bottomBlack 아이콘"
            className={ProjectIconRotation ? "rotate" : ""}
          />
        </SideBarMainTextBlack>
        {ProjectTextVisible && (
          <>
            <Text>진행중인 프로젝트</Text>
            <Text>예정된 프로젝트</Text>
            <Text>완료된 프로젝트</Text>
          </>
        )}
      </SideBarItem>
      <SideBarItem>
        <SideBarMainTextBlack onClick={ToggleOnboardingText}>
          <Section>
            <CompanyIcon src={onbordingBlack} alt="onbordingBlack 아이콘" />
            <MainTextBlack>온보딩</MainTextBlack>
          </Section>
          <BottomIcon
            src={bottomBlack}
            alt="bottomBlack 아이콘"
            className={OnboardingIconRotation ? "rotate" : ""}
          />
        </SideBarMainTextBlack>
        {OnboardingTextVisible && (
          <>
            <Text>신입사원 필독서</Text>
            <Text>온보딩 주제</Text>
          </>
        )}
      </SideBarItem>
    </SideBarBox>
  );
};

export default WikiSideBar;
