import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import GlobalStyle from "./styles/globalStyle";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
