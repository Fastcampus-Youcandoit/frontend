import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { WikiSideBar } from "../components/SideBar/SideBar";
import Header from "../components/common/Header";

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
