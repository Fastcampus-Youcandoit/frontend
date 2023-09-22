import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";
import GalleryModal from "./GalleryModal";
import GalleryDetailModal from "./GalleryDetailModal";
import dropdownIcon from "../../assets/icons/header_icon/header_dropdown_icon.png";
import { useAuth } from "../../context/AuthContext";
import { GallerySideBar } from "../sideBar/SideBar";
import { GalleryMainText } from "../../styles/SideBarStyle";

const GalleryBox = styled.div`
  margin-top: 2rem;
  width: 100%;
  padding-right: 3rem;

  @media (max-width: 1024px) {
    padding: 0 3rem;
  }
`;

const GalleryHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GalleryHeaderText = styled.span`
  font-family: "NotoSansKR-Bold";
  font-size: 25px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const UploadButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
  > img {
    width: 2.8rem;
    height: 2.8rem;
    transition: transform 0.8s;
    &:hover {
      transform: scale(1.1);
      transition: transform 0.8s;
    }
  }
`;

const GalleryContainer = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 0fr);
  grid-gap: 2rem;
  padding: 2rem;
  margin-top: 0.6rem;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
  }
  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

const GalleryItem = styled.img`
  width: 19vw;
  background-color: white;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #00000029;
  transition: transform 0.8s;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.8s;
  }
  @media (max-width: 1024px) {
    width: 72vw;
  }
  @media (max-width: 768px) {
    width: 64vw;
  }
`;

const GallerykSideBarBoxForMobile = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const SideBarToggle = styled.button`
    width: 100%;
    font-family: "NotoSansKR-Medium";
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    padding: inherit;
}`;

const DropdownSideBar = styled.div`
  height: 24rem;
  position: absolute;
  background-color: #fff;
  z-index: 99;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 15px;
  left: 2rem;
  top: 9.4rem;
`;

export const IconImg = styled.img`
  width: 1rem;
  margin-left: 0.5rem;
  .dropdown {
    width: 0.8rem;
  }
`;

const GallerySection = () => {
  const { currentUser } = useAuth(); // 현재 사용자 정보 가져오기

  const [isModal, setIsModal] = useState(false);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const params = useParams<Record<string, string | undefined>>();
  const pageName = params.pageName || "";

  const [isDrop, setIsDrop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

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
  }, [pageName]);

  const openDetailModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  const closeDetailModal = () => {
    setSelectedImageUrl(null);
  };

  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      if (toggleRef.current && toggleRef.current.contains(e.target as Node)) {
        return;
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDrop(false);
      }
    };

    window.addEventListener("click", clickEvent);

    return () => window.removeEventListener("click", clickEvent);
  }, []);

  return (
    <GalleryBox>
      <GalleryHeader>
        <GallerykSideBarBoxForMobile>
          <div ref={dropdownRef}>
            <SideBarToggle
              ref={toggleRef}
              onClick={e => {
                setIsDrop(!isDrop);
              }}>
              {pageTitleMapping[pageName] || "사진첩"}
              <IconImg
                className="dropdown"
                src={dropdownIcon}
                alt="dropdown icon"
              />
            </SideBarToggle>
          </div>
          <DropdownSideBar>{isDrop && <GallerySideBar />}</DropdownSideBar>
        </GallerykSideBarBoxForMobile>
        <GalleryHeaderText>모든 사진</GalleryHeaderText>
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
