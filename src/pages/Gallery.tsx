import React, { useState } from "react";
import styled from "styled-components";
import GallerySection from "../components/gallery/GallerySection";
import GalleryModal from "../components/gallery/GalleryModal";

const GalleryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Gallery = () => {
  const [isModal, setIsModal] = useState(false);

  const isModalChange = () => {
    setIsModal(!isModal);
  };

  return (
    <GalleryWrapper>
      {/* 사이드바 컴포넌트 */}

      <GallerySection isModalChange={isModalChange} />
      {/* Modal */}
      {isModal && <GalleryModal isModalChange={isModalChange} />}
    </GalleryWrapper>
  );
};

export default Gallery;
