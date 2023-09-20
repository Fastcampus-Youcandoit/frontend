import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";

// Gallery Componenets
import Business from "./components/gallery/Business";
import JobPosting from "./components/gallery/JobPosting";
import OfficePhoto from "./components/gallery/OfficePhoto";
import WikiComponent from "./components/wiki/WikiComponent";
import { Gallery, Home, Wiki } from "./pages";
import GlobalStyle from "./styles/globalStyle";
import GallerySection from "./components/gallery/GallerySection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
          <Route path=":pageName" element={<GallerySection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
