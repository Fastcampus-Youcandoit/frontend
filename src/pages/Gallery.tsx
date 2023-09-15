import React, { useState } from "react";
import styled from "styled-components";
import { Reset } from "styled-reset";
import GallerySection from "../components/gallery/GallerySection";
import GalleryModal from "../components/gallery/GalleryModal";

const GalleryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SideBar = styled.aside`
  width: 20%;
  margin-right: 10px;
`;

const Gallery = () => {
  const [isModal, setIsModal] = useState(false);

  const isModalChange = () => {
    setIsModal(!isModal);
  };

  return (
    <GalleryWrapper>
      <SideBar>Sidebar</SideBar>
      <GallerySection isModalChange={isModalChange} />

      {/* Modal */}
      {isModal && <GalleryModal isModalChange={isModalChange} />}
    </GalleryWrapper>
  );
};

export default Gallery;
