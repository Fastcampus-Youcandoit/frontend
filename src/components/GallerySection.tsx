import styled from "styled-components";
import { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
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
  > p {
    font: normal normal bold 30px/44px Noto Sans KR;
    margin-bottom: 20px;
  }
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
  > img {
    width: 45px;
    height: 45px;
  }
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
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imagesRef = ref(storage, "images");
        const allImages = await listAll(imagesRef);

        const urls = await Promise.all(
          allImages.items.map(async imageRef => {
            return getDownloadURL(imageRef);
          }),
        );
        setImgUrls(urls);
      } catch (error) {
        console.log(`Error fetching image URLs: ${error}`);
      }
    };

    fetchImage();

    return () => {
      setImgUrls([]);
    };
  }, []);

  return (
    <GalleryWrapper>
      <SideBar>Sidebar</SideBar>
      <GalleryBox>
        <GalleryHeader>
          <p>YouCanDoIt 내부 사진</p>
          <UploadButton type="button" onClick={isModalChange}>
            <img src={uploadIconUrl} alt="img upload icon" />
          </UploadButton>
        </GalleryHeader>
        <GalleryContainer>
          {imgUrls.map((url, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <GalleryItem key={index} src={url} alt={`${index} + image`} />
          ))}
        </GalleryContainer>
      </GalleryBox>
    </GalleryWrapper>
  );
};

export default GallerySection;
