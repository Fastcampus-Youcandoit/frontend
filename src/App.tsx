import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import GlobalStyle from "./styles/globalStyle";
import SideBar from "./components/SideBar/SideBar";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <SideBar />
    </BrowserRouter>
  );
};

export default App;
