import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { GallerySideBar } from "../components/SideBar/SideBar";
import Header from "../components/common/Header";

const GalleryWrapper = styled.div`
  display: flex;
`;

const GallerySideBarBoxForDeskTop = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Gallery = () => {
  return (
    <>
      <Header />
      <GalleryWrapper>
        <GallerySideBarBoxForDeskTop>
          <GallerySideBar />
        </GallerySideBarBoxForDeskTop>
        <Outlet />
      </GalleryWrapper>
    </>
  );
};

export default Gallery;
