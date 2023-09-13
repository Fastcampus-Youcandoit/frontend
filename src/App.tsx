import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import GlobalStyle from "./styles/globalStyle";
import SideBar from "./components/common/SideBar";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <SideBar />
    </BrowserRouter>
  );
};

export default App;
