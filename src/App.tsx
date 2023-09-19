import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";

// Wiki page
import Wiki from "./pages/Wiki";

// Gallery Componenets
import Gallery from "./pages/Gallery";
import OfficePhoto from "./components/gallery/OfficePhoto";
import Business from "./components/gallery/Business";
import JobPosting from "./components/gallery/JobPosting";
import WikiComponent from "./components/wiki/WikiComponent";

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
          <Route path="office-life/:pageName" element={<WikiComponent />} />
          {/* project */}
          <Route path="project/:pageName" element={<WikiComponent />} />
          {/* onboarding */}
          <Route path="onboarding/:pageName" element={<WikiComponent />} />
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
