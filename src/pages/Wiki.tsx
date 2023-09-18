import { BrowserRouter } from "react-router-dom";
import { Wikis } from "../components/SideBar/SideBar";
import GlobalStyle from "../styles/globalStyle";

const Wiki = () => {
  return (
    <>
      <GlobalStyle />
      <Wikis />
    </>
  );
};

export default Wiki;
