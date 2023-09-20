import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";

// Gallery Componenets
import GallerySection from "./components/gallery/GallerySection";
import WikiComponent from "./components/wiki/WikiComponent";
import { Gallery, Home, Notice, NoticeEditor, Wiki } from "./pages";
import GlobalStyle from "./styles/globalStyle";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* notice */}
        <Route path="/notice" element={<Notice />} />
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
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/edit" element={<NoticeEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
