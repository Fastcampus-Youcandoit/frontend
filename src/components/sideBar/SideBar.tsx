import { Link, useNavigate } from "react-router-dom";
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
import photosBlue from "../../assets/icons/sidebar_icon/photos_blue_icon.png";
import {
  SideBarBox,
  SideBarItem,
  Section,
  SideBarMainText,
  MainText,
  Text,
  CompanyIcon,
  BottomIcon,
  GalleryMainText,
} from "../../styles/SideBarStyle";

interface WikiSideBarProps {
  closeDropdown: () => void;
}

const WikiSideBar = ({ closeDropdown }: WikiSideBarProps) => {
  const navigate = useNavigate();
  const [CompanyTextVisible, setCompanyTextVisible] = useState(true);
  const [ProjectTextVisible, setProjectTextVisible] = useState(false);
  const [OnboardingTextVisible, setOnboardingTextVisible] = useState(false);

  const ToggleCompanyText = () => {
    setCompanyTextVisible(true);
    setProjectTextVisible(false);
    setOnboardingTextVisible(false);
    navigate("/wiki/office-life/company-rules");
  };

  const ToggleProjectText = () => {
    setCompanyTextVisible(false);
    setProjectTextVisible(true);
    setOnboardingTextVisible(false);
    navigate("/wiki/project/in-progress");
  };

  const ToggleOnboardingText = () => {
    setCompanyTextVisible(false);
    setProjectTextVisible(false);
    setOnboardingTextVisible(true);
    navigate("/wiki/onboarding/reading-list");
  };

  return (
    <SideBarBox>
      {/* CompanyRules */}
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
      </SideBarItem>
      {CompanyTextVisible && (
        <>
          <Link to="/wiki/office-life/company-rules" onClick={closeDropdown}>
            <Text>회사내규</Text>
          </Link>
          <Link
            to="/wiki/office-life/team-introduction"
            onClick={closeDropdown}>
            <Text>팀소개</Text>
          </Link>
          <Link
            to="/wiki/office-life/organization-chart"
            onClick={closeDropdown}>
            <Text>조직도</Text>
          </Link>
        </>
      )}
      {/* Project */}
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
      </SideBarItem>
      {ProjectTextVisible && (
        <>
          <Link to="/wiki/project/in-progress" onClick={closeDropdown}>
            <Text>진행중인 프로젝트</Text>
          </Link>
          <Link to="/wiki/project/upcoming" onClick={closeDropdown}>
            <Text>예정된 프로젝트</Text>
          </Link>
          <Link to="/wiki/project/completed" onClick={closeDropdown}>
            <Text>완료된 프로젝트</Text>
          </Link>
        </>
      )}
      {/* Onboarding */}
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
      </SideBarItem>
      {OnboardingTextVisible && (
        <>
          <Link to="/wiki/onboarding/reading-list" onClick={closeDropdown}>
            <Text>신입사원 필독서</Text>
          </Link>
          <Link to="/wiki/onboarding/topics" onClick={closeDropdown}>
            <Text>온보딩 주제</Text>
          </Link>
        </>
      )}
    </SideBarBox>
  );
};

const GallerySideBar = () => {
  const [PhotosTextVisible, setPhotosTextVisible] = useState(true);

  const ToggleCompanyText = () => {
    setPhotosTextVisible(true);
  };
  return (
    <SideBarBox>
      <SideBarItem>
        <SideBarMainText
          onClick={ToggleCompanyText}
          style={{
            backgroundColor: PhotosTextVisible ? "#e6f7ff" : "transparent",
            color: PhotosTextVisible ? "#087ea4" : "black",
          }}>
          <Section>
            <CompanyIcon
              src={PhotosTextVisible ? photosBlue : " "}
              alt="사진첩 아이콘"
            />
            <Link to="/gallery/all">
              <GalleryMainText>사진첩</GalleryMainText>
            </Link>
          </Section>
          <BottomIcon
            src={PhotosTextVisible ? bottomBlue : bottomBlack}
            alt="사진첩 아이콘"
            className={PhotosTextVisible ? "rotate" : ""}
          />
        </SideBarMainText>
        <Link to="/gallery/office-photo">
          <Text>내부 사진</Text>
        </Link>
        <Link to="/gallery/business">
          <Text>협력사</Text>
        </Link>
        <Link to="/gallery/job-posting">
          <Text>채용공고</Text>
        </Link>
      </SideBarItem>
    </SideBarBox>
  );
};

export { WikiSideBar, GallerySideBar };
