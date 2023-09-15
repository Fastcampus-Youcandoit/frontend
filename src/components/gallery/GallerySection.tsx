import styled from "styled-components";
import { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";

const GalleryBox = styled.div`
  margin-top: 2rem;
  width: 80%;
`;

const GalleryHeader = styled.div`
  width: 100%;
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
  margin-right: 45px;
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
  width: 100%;
  margin-top: 10px;
  margin-right: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 38px;
`;

const GalleryItem = styled.img`
  width: 90%;
  height: 260px;
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
    <GalleryBox>
      <GalleryHeader>
        <p>YouCanDoIt 내부 사진</p>
        <UploadButton type="button" onClick={isModalChange}>
          <img src={uploadIconUrl} alt="img upload icon" />
        </UploadButton>
      </GalleryHeader>
      <GalleryContainer>
        {imgUrls.map((url, index) => (
          <GalleryItem key={url} src={url} alt={`${index} + image`} />
        ))}
      </GalleryContainer>
    </GalleryBox>
  );
};

export default GallerySection;
