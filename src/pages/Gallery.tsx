import { BrowserRouter } from "react-router-dom";
import { Gallerys } from "../components/SideBar/SideBar";
import Header from "../components/common/Header";
import GlobalStyle from "../styles/globalStyle";

const Gellery = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Gallerys />
    </BrowserRouter>
  );
};

export default Gellery;
