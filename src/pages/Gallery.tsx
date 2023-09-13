import React, { useState } from "react";
import { Reset } from "styled-reset";
import GallerySection from "../components/GallerySection";
import GalleryModal from "../components/GalleryModal";

const Gallery = () => {
  const [isModal, setIsModal] = useState(false);

  const isModalChange = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <Reset />
      <GallerySection isModalChange={isModalChange} />

      {/* Modal */}
      {isModal && <GalleryModal isModalChange={isModalChange} />}
    </>
  );
};

export default Gallery;
