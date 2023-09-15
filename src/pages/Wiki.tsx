import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/common/Header";
import SideBar from "../components/SideBar/SideBar";
import GlobalStyle from "../styles/globalStyle";
import OfficeLife from "../components/SideBar/OfficeLife";
import { SideBarBox } from "../styles/SideBarStyle";

const Wiki = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <SideBarBox>
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route path="office-life" />
            <Route path="project" />
            <Route path="onboarding" />
          </Route>
        </Routes>
      </SideBarBox>
    </BrowserRouter>
  );
};

export default Wiki;
