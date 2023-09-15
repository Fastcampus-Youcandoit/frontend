import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../assets/fonts/Font.css";
import companyBlack from "../../assets/icons/sidebar_icon/company_black_icon.png";
import companyBlue from "../../assets/icons/sidebar_icon/company_blue_icon.png";
import bottomBlack from "../../assets/icons/sidebar_icon/bottom_black_icon.png";
import bottomBlue from "../../assets/icons/sidebar_icon/bottom_blue_icon.png";
import projectBlack from "../../assets/icons/sidebar_icon/project_black_icon.png";
import projectBlue from "../../assets/icons/sidebar_icon/project_blue_icon.png";
import onboardingBlack from "../../assets/icons/sidebar_icon/onboarding_black_icon.png";
import onboardingBlue from "../../assets/icons/sidebar_icon/onboarding_blue_icon.png";
import {
  SideBarBox,
  SideBarItem,
  Section,
  SideBarMainText,
  MainText,
  Text,
  CompanyIcon,
  BottomIcon,
} from "../../styles/SideBarStyle";

const WikiSideBar = () => {
  const [CompanyTextVisible, setCompanyTextVisible] = useState(false);
  const [ProjectTextVisible, setProjectTextVisible] = useState(false);
  const [OnboardingTextVisible, setOnboardingTextVisible] = useState(false);

  const ToggleCompanyText = () => {
    setCompanyTextVisible(!CompanyTextVisible);
  };

  const ToggleProjectText = () => {
    setProjectTextVisible(!ProjectTextVisible);
  };

  const ToggleOnboardingText = () => {
    setOnboardingTextVisible(!OnboardingTextVisible);
  };

  return (
    <SideBarBox>
      <SideBarItem>
        <SideBarMainText
          onClick={ToggleCompanyText}
          style={{
            backgroundColor: CompanyTextVisible ? "#e6f7ff" : "transparent",
            color: CompanyTextVisible ? "#087ea4" : "black",
          }}>
          <Section>
            <CompanyIcon
              src={CompanyTextVisible ? companyBlue : companyBlack}
              alt="회사 아이콘"
            />
            <MainText>회사생활</MainText>
          </Section>
          <BottomIcon
            src={CompanyTextVisible ? bottomBlue : bottomBlack}
            alt="회사 아이콘"
            className={CompanyTextVisible ? "rotate" : ""}
          />
        </SideBarMainText>
        {CompanyTextVisible && (
          <>
            <Text>회사내규</Text>
            <Text>팀소개</Text>
            <Text>조직도</Text>
          </>
        )}
      </SideBarItem>
      <SideBarItem>
        <SideBarMainText
          onClick={ToggleProjectText}
          style={{
            backgroundColor: ProjectTextVisible ? "#e6f7ff" : "transparent",
            color: ProjectTextVisible ? "#087ea4" : "black",
          }}>
          <Section>
            <CompanyIcon
              src={ProjectTextVisible ? projectBlue : projectBlack}
              alt="프로젝트 아이콘"
            />
            <MainText>프로젝트</MainText>
          </Section>
          <BottomIcon
            src={ProjectTextVisible ? bottomBlue : bottomBlack}
            alt="프로젝트 아이콘"
            className={ProjectTextVisible ? "rotate" : ""}
          />
        </SideBarMainText>
        {ProjectTextVisible && (
          <>
            <Text>진행중인 프로젝트</Text>
            <Text>예정된 프로젝트</Text>
            <Text>완료된 프로젝트</Text>
          </>
        )}
      </SideBarItem>
      <SideBarItem>
        <SideBarMainText
          onClick={ToggleOnboardingText}
          style={{
            backgroundColor: OnboardingTextVisible ? "#e6f7ff" : "transparent",
            color: OnboardingTextVisible ? "#087ea4" : "black",
          }}>
          <Section>
            <CompanyIcon
              src={OnboardingTextVisible ? onboardingBlue : onboardingBlack}
              alt="온보딩 아이콘"
            />
            <MainText>온보딩</MainText>
          </Section>
          <BottomIcon
            src={OnboardingTextVisible ? bottomBlue : bottomBlack}
            alt="온보딩 아이콘"
            className={OnboardingTextVisible ? "rotate" : ""}
          />
        </SideBarMainText>
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
