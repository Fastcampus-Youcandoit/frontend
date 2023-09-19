import { Outlet } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import GallerySection from "../components/gallery/GallerySection";
import GalleryModal from "../components/gallery/GalleryModal";
import { GallerySideBar } from "../components/SideBar/SideBar";

const GalleryWrapper = styled.div`
  display: flex;
  // justify-content: space-between;
`;

const Gallery = () => {
  return (
    <GalleryWrapper>
      <GallerySideBar />
      <Outlet />
      {/* <GallerySection /> */}
    </GalleryWrapper>
  );
};

export default Gallery;
