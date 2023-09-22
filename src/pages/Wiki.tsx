import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { WikiSideBar } from "../components/SideBar/SideBar";

const WikiWrapper = styled.div`
  display: flex;
`;

const WikiSideBarBoxForDeskTop = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Wiki = () => {
  return (
    <>
      <Header />
      <WikiWrapper>
        <WikiSideBarBoxForDeskTop>
          <WikiSideBar closeDropdown={() => console.log("WikiSideBar!")} />
        </WikiSideBarBoxForDeskTop>
        <Outlet />
      </WikiWrapper>
    </>
  );
};

export default Wiki;
