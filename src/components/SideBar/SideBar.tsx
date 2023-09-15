import { Routes, Route, Link, Outlet } from "react-router-dom";
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
import { Photos, OfficePhoto, Business, JobPosting } from "./Photos";
import { Onboarding, ReadingList, Topics } from "./Onboarding";
import { Project, InProject, UpComing, Completed } from "./Project";
import {
  OfficeLife,
  CompanyRules,
  TeamIntroduction,
  OrganizationChart,
} from "./OfficeLife";
import {
  SideBarBox,
  SideBarItem,
  Section,
  SideBarMainText,
  MainText,
  CompanyIcon,
  BottomIcon,
} from "../../styles/SideBarStyle";

const WikiSideBar = () => {
  const [CompanyTextVisible, setCompanyTextVisible] = useState(true);
  const [ProjectTextVisible, setProjectTextVisible] = useState(false);
  const [OnboardingTextVisible, setOnboardingTextVisible] = useState(false);

  const ToggleCompanyText = () => {
    setCompanyTextVisible(true);
    setProjectTextVisible(false);
    setOnboardingTextVisible(false);
  };

  const ToggleProjectText = () => {
    setCompanyTextVisible(false);
    setProjectTextVisible(true);
    setOnboardingTextVisible(false);
  };

  const ToggleOnboardingText = () => {
    setCompanyTextVisible(false);
    setProjectTextVisible(false);
    setOnboardingTextVisible(true);
  };

  return (
    <SideBarBox>
      <SideBarItem>
        <Link to="/office-life">
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
        </Link>
        {CompanyTextVisible && <Outlet />}
      </SideBarItem>
      <SideBarItem>
        <Link to="/project">
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
        </Link>
        {ProjectTextVisible && <Outlet />}
      </SideBarItem>
      <SideBarItem>
        <Link to="/onboarding">
          <SideBarMainText
            onClick={ToggleOnboardingText}
            style={{
              backgroundColor: OnboardingTextVisible
                ? "#e6f7ff"
                : "transparent",
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
        </Link>
        {OnboardingTextVisible && <Outlet />}
      </SideBarItem>
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
        <Link to="/photos">
          <SideBarMainText
            onClick={ToggleCompanyText}
            style={{
              backgroundColor: PhotosTextVisible ? "#e6f7ff" : "transparent",
              color: PhotosTextVisible ? "#087ea4" : "black",
            }}>
            <Section>
              <CompanyIcon
                src={PhotosTextVisible ? photosBlue : " "}
                alt="온보딩 아이콘"
              />
              <MainText>온보딩</MainText>
            </Section>
            <BottomIcon
              src={PhotosTextVisible ? bottomBlue : bottomBlack}
              alt="온보딩 아이콘"
              className={PhotosTextVisible ? "rotate" : ""}
            />
          </SideBarMainText>
        </Link>
        {PhotosTextVisible && <Outlet />}
      </SideBarItem>
    </SideBarBox>
  );
};

const Wikis = () => {
  return (
    <Routes>
      <Route path="/" element={<WikiSideBar />}>
        <Route path="office-life" element={<OfficeLife />}>
          <Route path="company-rules" element={<CompanyRules />} />
          <Route path="team-introduction" element={<TeamIntroduction />} />
          <Route path="organization-chart" element={<OrganizationChart />} />
        </Route>
        <Route path="project" element={<Project />}>
          <Route path="in-progress" element={<InProject />} />
          <Route path="upcoming" element={<UpComing />} />
          <Route path="completed" element={<Completed />} />
        </Route>
        <Route path="onboarding" element={<Onboarding />}>
          <Route path="reading-list" element={<ReadingList />} />
          <Route path="topics" element={<Topics />} />
        </Route>
      </Route>
    </Routes>
  );
};

const Gallerys = () => {
  return (
    <Routes>
      <Route path="/" element={<GallerySideBar />}>
        <Route path="photos" element={<Photos />}>
          <Route path="office-photo" element={<OfficePhoto />} />
          <Route path="business" element={<Business />} />
          <Route path="job-posting" element={<JobPosting />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { Wikis, Gallerys };
