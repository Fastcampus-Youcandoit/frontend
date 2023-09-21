import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { GallerySideBar } from "../components/SideBar/SideBar";
import Header from "../components/common/Header";

const GalleryWrapper = styled.div`
  display: flex;
`;

const Gallery = () => {
  return (
    <>
      <Header />
      <GalleryWrapper>
        <GallerySideBar />
        <Outlet />
      </GalleryWrapper>
    </>
  );
};

export default Gallery;
