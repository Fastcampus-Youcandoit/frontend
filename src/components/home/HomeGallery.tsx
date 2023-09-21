import { getDownloadURL, list, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import chevronL from "../../assets/images/chevron/chevron_left.png";
import chevronR from "../../assets/images/chevron/chevron_right.png";
import { storage } from "../../firebase";
import { ImageFilesType } from "../../types/home";

const SectionContainer = styled.section`
  width: 50%;
  height: calc(width / 16 * 9);
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.5s;

  @media (max-width: 1024px) {
    width: 100%;
    transition: all 0.5s;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1.2px solid #d2d2d2;
  font-family: "SUITE-Bold";
  padding-bottom: 0.5rem;
  height: 10%;
`;

const HeaderContentContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SectionHeaderTitle = styled.div`
  font-size: 1.2rem;
`;

const SectionHeaderDesc = styled.div`
  font-size: 0.8rem;
  font-family: "NotoSansKR-Medium";
  padding-top: 0.2rem;
`;

const SectionButtonBox = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const SectionButton = styled.button`
  background-color: #f6f7f9;
  border-radius: 5px;
  border: none;
  padding: 0.2rem;
  height: 1.5rem;
  cursor: pointer;
`;

const SectionButtonImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: #f6f7f9;
`;

const SectionImagesBox = styled.div`
  height: 90%;
  padding-top: 1rem;
`;

const ImageItems = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 4px;
`;

const ImageItem = styled.li`
  flex: 1 1 30%;
  height: 48%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    object-fit: scale-down;
    background-color: white;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
    transform: scale(1.25);
    transition: transform 0.5s;
  }
`;

const HomeGallery = () => {
  const [imgUrls, setImgUrls] = useState<ImageFilesType>({
    business: [],
    jobPosting: [],
    officePhoto: [],
  });

  const [buttonNumber, setButtonNumber] = useState<number>(0);
  const [currentImageFile, setCurrentImageFile] = useState<
    "business" | "jobPosting" | "officePhoto" | null
  >(null);
  const fetchImagesFromFolder = async (folderPath: string | undefined) => {
    const folderRef = ref(storage, folderPath);

    try {
      const imageList = await list(folderRef, { maxResults: 6 });

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
    const [businessImages, jobPostingImages, officePhotoImages] =
      await Promise.all([
        await fetchImagesFromFolder("images/business"),
        await fetchImagesFromFolder("images/job-posting"),
        await fetchImagesFromFolder("images/office-photo"),
      ]);

    setImgUrls(prevImgUrls => ({
      ...prevImgUrls,
      business: businessImages,
      jobPosting: jobPostingImages,
      officePhoto: officePhotoImages,
    }));
  };

  const handleNextButton = (num: number) => {
    setButtonNumber(prevButtonNumber => {
      if (num === 2) return 0;
      return prevButtonNumber + 1;
    });
  };

  const handlePrevButton = (num: number) => {
    setButtonNumber(prevButtonNumber => {
      if (num === 0) return 2;
      return prevButtonNumber - 1;
    });
  };

  useEffect(() => {
    try {
      fetchAllImages();
    } catch (error) {
      console.log(`Error fetching image URLs: ${error}`);
    }
  }, []);

  useEffect(() => {
    if (buttonNumber === 0) setCurrentImageFile("business");
    else if (buttonNumber === 1) setCurrentImageFile("jobPosting");
    else setCurrentImageFile("officePhoto");
  }, [buttonNumber]);

  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderContentContainer>
          <SectionHeaderTitle>갤러리</SectionHeaderTitle>
          <SectionHeaderDesc>youcandoit 관련 갤러리 입니다.</SectionHeaderDesc>
        </HeaderContentContainer>
        <SectionButtonBox>
          <SectionButton type="button">
            <SectionButtonImg
              src={chevronL}
              onClick={() => handlePrevButton(buttonNumber)}
            />
          </SectionButton>
          <SectionButton type="button">
            <SectionButtonImg
              src={chevronR}
              onClick={() => handleNextButton(buttonNumber)}
            />
          </SectionButton>
        </SectionButtonBox>
      </SectionHeader>
      <SectionImagesBox>
        <ImageItems>
          <ImageItems>
            {currentImageFile &&
              imgUrls[currentImageFile].map((url, index) => (
                <ImageItem key={url}>
                  <Image src={url} alt={`${index} image`} />
                </ImageItem>
              ))}
          </ImageItems>
        </ImageItems>
      </SectionImagesBox>
    </SectionContainer>
  );
};

export default HomeGallery;
