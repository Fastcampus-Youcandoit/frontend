import { Outlet } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import GallerySection from "../components/gallery/GallerySection";
import GalleryModal from "../components/gallery/GalleryModal";
import { GallerySideBar } from "../components/sidebar/SideBar";

const GalleryWrapper = styled.div`
  display: flex;
  // justify-content: space-between;
`;

const Gallery = () => {
  const [isModal, setIsModal] = useState(false);

  const isModalChange = () => {
    setIsModal(!isModal);
  };

  return (
    <GalleryWrapper>
      <GallerySideBar />
      <Outlet />
      {/* <GallerySection isModalChange={isModalChange} /> */}
      {/* Modal */}
      {/* {isModal && <GalleryModal isModalChange={isModalChange} />} */}
    </GalleryWrapper>
  );
};

export default Gallery;
