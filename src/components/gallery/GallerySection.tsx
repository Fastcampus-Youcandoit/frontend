import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";
import GalleryModal from "./GalleryModal";
import GalleryDetailModal from "./GalleryDetailModal";
import { WikiMainText } from "../wiki/WikiComponent";
import { useAuth } from "../../context/AuthContext";

const GalleryBox = styled.div`
  margin-top: 2rem;
  width: 80%;
`;

const GalleryHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  background-color: #808080;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.8s;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.8s;
  }
`;

const GallerySection = () => {
  const { currentUser } = useAuth(); // 현재 사용자 정보 가져오기

  const [isModal, setIsModal] = useState(false);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const params = useParams<Record<string, string | undefined>>();
  const pageName = params.pageName || "";

  const pageTitleMapping: Record<string, string> = {
    "office-photo": "내부 사진",
    business: "협력사",
    "job-posting": "채용 공고",
  };

  const isModalChange = () => {
    setIsModal(!isModal);
  };

  const fetchImagesFromFolder = async (folderPath: string | undefined) => {
    const folderRef = ref(storage, folderPath);

    try {
      const imageList = await listAll(folderRef);

      const imageURLs = await Promise.all(
        imageList.items.map(async imageRef => {
          return getDownloadURL(imageRef);
        }),
      );
      return imageURLs;
    } catch (error) {
      console.log(`Error fetching image URLs: ${error}`);
      return [];
    }
  };

  const fetchAllImages = async () => {
    const allImageURLs = [];

    const businessImages = await fetchImagesFromFolder("images/business");
    const jobPostingImages = await fetchImagesFromFolder("images/job-posting");
    const officePhotoImages = await fetchImagesFromFolder(
      "images/office-photo",
    );

    allImageURLs.push(
      ...businessImages,
      ...jobPostingImages,
      ...officePhotoImages,
    );
    setImgUrls(allImageURLs);
  };

  const fetchImages = async () => {
    try {
      const imagesRef = ref(storage, `images/${pageName}`);
      const allImages = await listAll(imagesRef);

      const imageURLs = await Promise.all(
        allImages.items.map(async imageRef => {
          return getDownloadURL(imageRef);
        }),
      );
      setImgUrls(imageURLs);
    } catch (error) {
      console.log(`Error fetching image URLs: ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    if (pageName === "all") {
      fetchAllImages();
    } else {
      fetchImages();
    }

    return () => {
      setImgUrls([]);
    };
  }, [params]);

  const openDetailModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  const closeDetailModal = () => {
    setSelectedImageUrl(null);
  };

  return (
    <GalleryBox>
      <GalleryHeader>
        <WikiMainText>{pageTitleMapping[pageName] || "전체 사진"}</WikiMainText>
        {currentUser && (
          <UploadButton type="button" onClick={isModalChange}>
            <img src={uploadIconUrl} alt="img upload icon" />
          </UploadButton>
        )}
      </GalleryHeader>
      <GalleryContainer>
        {imgUrls.map((url, index) => (
          <GalleryItem
            key={url}
            src={url}
            alt={`${index} image`}
            onClick={() => openDetailModal(url)}
          />
        ))}
      </GalleryContainer>

      {isModal && <GalleryModal isModalChange={isModalChange} />}

      {selectedImageUrl && (
        <GalleryDetailModal
          imageUrl={selectedImageUrl}
          onClose={closeDetailModal}
        />
      )}
    </GalleryBox>
  );
};

export default GallerySection;
