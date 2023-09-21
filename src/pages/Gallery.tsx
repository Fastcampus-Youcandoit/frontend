import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { GallerySideBar } from "../components/SideBar/SideBar";

const GalleryWrapper = styled.div`
  display: flex;
`;

const Gallery = () => {
  return (
    <GalleryWrapper>
      <GallerySideBar />
      <Outlet />
    </GalleryWrapper>
  );
};

export default Gallery;
