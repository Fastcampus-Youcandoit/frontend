import { BrowserRouter, Route, Routes } from "react-router-dom";
import GallerySection from "./components/gallery/GallerySection";
import WikiComponent from "./components/wiki/WikiComponent";
import { Gallery, Home, Notice, NoticeEditor, Wiki } from "./pages";
import GlobalStyle from "./styles/globalStyle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
