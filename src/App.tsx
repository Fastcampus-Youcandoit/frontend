import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import GlobalStyle from "./styles/globalStyle";
import { WikiSideBar, GallerySideBar } from "./components/sidebar/SideBar";
import Wiki from "./pages/Wiki";
import {
  CompanyRules,
  OfficeLife,
  OrganizationChart,
  TeamIntroduction,
} from "./components/sidebar/OfficeLife";
import {
  Photos,
  OfficePhoto,
  Business,
  JobPosting,
} from "./components/sidebar/Photos";
import {
  Onboarding,
  ReadingList,
  Topics,
} from "./components/sidebar/Onboarding";
import {
  Project,
  InProject,
  UpComing,
  Completed,
} from "./components/sidebar/Project";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />}>
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
        <Route path="/gallery" element={<Gallery />}>
          <Route path="photos" element={<Photos />}>
            <Route path="office-photo" element={<OfficePhoto />} />
            <Route path="business" element={<Business />} />
            <Route path="job-posting" element={<JobPosting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
