import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { WikiSideBar } from "../components/sideBar/SideBar";
import Footer from "../components/common/Footer";

const WikiWrapper = styled.div`
  display: flex;
`;

const Wiki = () => {
  return (
    <WikiWrapper>
      <WikiSideBar />
      <Outlet />
    </WikiWrapper>
  );
};

export default Wiki;
