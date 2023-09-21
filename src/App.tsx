import { BrowserRouter, Route, Routes } from "react-router-dom";

// Gallery Componenets
import GallerySection from "./components/gallery/GallerySection";
import WikiComponent from "./components/wiki/WikiComponent";
import { AuthProvider } from "./context/AuthContext";
import { Gallery, Home, NotFound, Notice, NoticeEditor, Wiki } from "./pages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyle from "./styles/globalStyle";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
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
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/edit" element={<NoticeEditor />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
