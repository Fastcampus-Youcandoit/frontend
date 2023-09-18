import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";

// Wiki page
import Wiki from "./pages/Wiki";

// office-life Componenets
import CompanyRules from "./components/wiki/office-life/CompanyRules";
import OrganizationChart from "./components/wiki/office-life/OrganizationChart";
import TeamIntroduction from "./components/wiki/office-life/TeamIntroduction";

// project Components
import InProject from "./components/wiki/project/InProject";
import UpComing from "./components/wiki/project/UpComing";
import Completed from "./components/wiki/project/Completed";

// onboarding Components
import ReadingList from "./components/wiki/onboarding/ReadingList";
import Topics from "./components/wiki/onboarding/Topics";

// Gallery Componenets
import Gallery from "./pages/Gallery";
import OfficePhoto from "./components/gallery/OfficePhoto";
import Business from "./components/gallery/Business";
import JobPosting from "./components/gallery/JobPosting";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* wiki */}
        <Route path="/wiki" element={<Wiki />}>
          {/* office-life */}
          <Route path="office-life/company-rules" element={<CompanyRules />} />
          <Route
            path="office-life/team-introduction"
            element={<TeamIntroduction />}
          />
          <Route
            path="office-life/organization-chart"
            element={<OrganizationChart />}
          />
          {/* project */}
          <Route path="project/in-progress" element={<InProject />} />
          <Route path="project/upcoming" element={<UpComing />} />
          <Route path="project/completed" element={<Completed />} />
          {/* onboarding */}
          <Route path="onboarding/reading-list" element={<ReadingList />} />
          <Route path="onboarding/topics" element={<Topics />} />
        </Route>
        {/* gallery */}
        <Route path="/gallery" element={<Gallery />}>
          <Route path="office-photo" element={<OfficePhoto />} />
          <Route path="business" element={<Business />} />
          <Route path="job-posting" element={<JobPosting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
