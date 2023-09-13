import styled from "styled-components";
import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import uploadIconUrl from "../assets/icons/gallery_icon/image_upload_icon.png";

const GalleryWrapper = styled.div`
  display: flex;
`;

const SideBar = styled.aside`
  width: 460px;
`;

const GalleryBox = styled.div`
  margin-top: 2rem;
`;

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GalleryTitle = styled.p`
  font: normal normal bold 30px/44px Noto Sans KR;
  margin-bottom: 20px;
`;

const UploadButton = styled.button`
  margin: 0;
  padding: 0;
  margin-right: 3rem;
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const UploadIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const GalleryContainer = styled.div`
  margin-right: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const GalleryItem = styled.img`
  width: 360px;
  height: 240px;
  margin-right: 36px;
  margin-bottom: 20px;
  object-fit: cover;
  border-radius: 10px;
`;

interface ModalProps {
  isModalChange: () => void;
}

const GallerySection = ({ isModalChange }: ModalProps) => {
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(storage, "img1.png");
      try {
        const url = await getDownloadURL(imageRef);
        setImgUrl(url);
      } catch {
        setImgUrl("error");
      }
    };

    fetchImage();
  }, []);

  return (
    <GalleryWrapper>
      <SideBar>Sidebar</SideBar>
      <GalleryBox>
        <GalleryHeader>
          <GalleryTitle>YouCanDoIt 내부 사진</GalleryTitle>
          <UploadButton type="button" onClick={isModalChange}>
            <UploadIcon src={uploadIconUrl} alt="img upload icon" />
          </UploadButton>
        </GalleryHeader>
        <GalleryContainer>
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
          <GalleryItem src={imgUrl} alt="img1" />
        </GalleryContainer>
      </GalleryBox>
    </GalleryWrapper>
  );
};

export default GallerySection;
