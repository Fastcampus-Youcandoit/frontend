import { BrowserRouter } from "react-router-dom";
import Header from "../components/common/Header";
import { Wikis } from "../components/SideBar/SideBar";
import GlobalStyle from "../styles/globalStyle";

const Wiki = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Wikis />
    </BrowserRouter>
  );
};

export default Wiki;