import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import { Gallery, Home, Wiki } from "./pages";
import GlobalStyle from "./styles/globalStyle";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/wiki" element={<Wiki />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
