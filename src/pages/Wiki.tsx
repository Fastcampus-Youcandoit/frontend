import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { WikiSideBar } from "../components/sideBar/SideBar";

const WikiWrapper = styled.div`
  display: flex;
`;

const Wiki = () => {
  return (
    <>
      <Header />
      <WikiWrapper>
        <WikiSideBar />
        <Outlet />
      </WikiWrapper>
    </>
  );
};

export default Wiki;
