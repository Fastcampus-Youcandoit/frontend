import { ref, uploadString } from "firebase/storage";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";
import { storage } from "../../firebase";
import { GalleryProps, ModalProps } from "../../types/gallery";
import "../../assets/fonts/Font.css";

export const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 98;
`;

export const ModalBox = styled.div`
  width: 51vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  z-index: 99;
  > div {
    padding: 0.625rem;
  }
  @media (max-width: 768px) {
    width: 70vw;
  }
`;

export const CloseButton = styled.button`
  margin: 1.25rem;
  margin-left: auto;
  border: none;
  background: none;
  cursor: pointer;
  @media (max-width: 768px) {
    margin: 1rem;
    margin-left: auto;
  }
  > img {
    width: 1.5rem;
    height: 1.5rem;
    @media (max-width: 768px) {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

export const UploadBox = styled.div`
  width: 41.5vw;
  height: 22.2vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
  box-shadow: 0px 3px 6px #00000029;
  border: 2px solid #d2d2d2;
  border-radius: 30px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 55vw;
    height: 35.7vw;
  }
`;

export const ImagePreview = styled.img`
  width: 41.5vw;
  height: 22.2vw;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: 0px 3px 6px #00000029;
`;

export const ModalUploadIcon = styled.img`
  width: 9vw;
  height: 9vw;
  text-align: center;
  @media (max-width: 768px) {
    width: 9vw;
    height: 9vw;
  }
  @media (max-width: 475px) {
    width: 11vw;
    height: 11vw;
  }
`;

export const UploadDescription = styled.p`
  font-size: 1.2rem;
  font-family: "NotoSansKR-Medium";
  margin: 1.6vw 0 1rem 0;
  white-space: no-wrap;
  > img {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }
  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }
  @media (max-width: 475px) {
    font-size: 0.5rem;
    margin: 0 0.3rem;
    margin-top: 1.6vw;
  }
`;

export const FileNameBox = styled.div`
  width: 41.5vw;
  display: flex;
  margin: 1rem auto;
  padding-left: 0.02rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 55vw;
  }
  @media (max-width: 475px) {
    flex-direction: column;
    align-items: start;
    margin: 1rem auto;
  }
`;
export const FileName = styled.div`
  display: flex;
  margin-right: auto;
  > svg {
    margin-right: 0.2rem;
  }
  > span {
    margin-left: 0.3rem;
    text-align: center;
    font-family: "NotoSansKR-Medium";
    font-size: 1rem;
  }

  @media (max-width: 475px) {
    padding-top: 0.4rem;
    > svg {
      margin-right: 0.1rem;
      width: 0.8rem;
      height: 0.8rem;
    }
    > span {
      font-size: 0.8rem;
    }
  }
`;
export const Select = styled.select<GalleryProps>`
  margin-right: 0.5rem;
  color: ${props => props.color || "#808080"};
  padding: 0.1rem 0.2rem;
  border: 1px solid #808080;
  font-size: 0.9rem;
  font-family: "NotoSansKR-Medium";
  border-radius: 3px;
  > option {
    border: inherit;
  }
  @media (max-width: 475px) {
    padding: 0.05rem 0.15rem;
    font-size: 0.8rem;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const ButtonBox = styled.div`
  width: 41.5vw;
  display: flex;
  margin-bottom: 2rem;
  > div {
    margin-left: auto;
  }
  @media (max-width: 768px) {
    width: 55vw;
  }
`;

export const Button = styled.button<GalleryProps>`
  margin-left: 1.25rem;
  padding: 0.6vw 1.1vw;
  text-align: center;
  font-size: 1.25rem;
  font-family: "NotoSansKR-Medium";
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.8s;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.$backgroundColor || "#fff"};
  border: 2px solid ${props => props.bordercolor || "#d2d2d2"};
  &:hover {
    transform: scale(1.08);
    transition: transform 0.8s;
  }

  @media (max-width: 768px) {
    margin-left: 0.8rem;
    padding: 1vw 1.5vw;
    font-size: 0.8rem;
  }
`;

const GalleryModal = ({ isModalChange }: ModalProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const modalBackgroundRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // click modal background
  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalBackgroundRef.current) {
      isModalChange();
    }
  };

  // click input
  const handleInputFile = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // selected image preview
  const handlePreview = (file: File | undefined) => {
    if (file) {
      setSelectedFileName(file?.name || null);

      const reader = new FileReader();
      reader.onload = event => {
        if (event.target) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // check image file
  const checkImageFile = (file: File | undefined): boolean => {
    if (file) {
      const allowedExtentions = ["png", "jpg", "jpeg", "gif"];
      const fileExtension: string =
        file.name.split(".").pop()?.toLowerCase() || "";

      if (allowedExtentions.includes(fileExtension)) {
        return true;
      }
    } else {
      return false;
    }
    return false;
  };

  // drag input
  const handleDrag = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile: File | undefined = e.dataTransfer.files[0];

    if (checkImageFile(selectedFile)) {
      setSelectedFileName(selectedFile?.name || null);
      handlePreview(selectedFile);
    } else {
      alert("이미지 파일만 업로드가 가능합니다.");
      setSelectedFileName(null);
      setSelectedImage(null);
    }
  }, []);

  // file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | undefined = e.target.files?.[0];

    if (checkImageFile(selectedFile)) {
      handlePreview(selectedFile);
    } else {
      alert("이미지 파일만 업로드가 가능합니다.");
    }
  };

  // image upload
  const handleUpload = async () => {
    if (!selectedImage) {
      alert("파일을 선택해주세요.");
    } else if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
    }

    try {
      if (selectedImage && selectedCategory) {
        const storageRef = ref(
          storage,
          `images/${selectedCategory}/${selectedFileName}`,
        );
        await uploadString(storageRef, selectedImage, "data_url");
        alert("업로드가 완료되었습니다.");
        window.location.href = "/gallery/all";
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <ModalBackground onClick={handleClickBackground} ref={modalBackgroundRef}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseButton type="button" onClick={isModalChange}>
          <img src={closeIconUrl} alt="close icon" />
        </CloseButton>

        <div>
          <UploadBox
            onClick={handleInputFile}
            onDrop={handleDrag}
            onDragOver={e => e.preventDefault()}>
            {selectedImage ? (
              <ImagePreview src={selectedImage} alt="미리보기" />
            ) : (
              <>
                <ModalUploadIcon src={uploadIconUrl} alt="upload icon" />
                <UploadDescription>
                  파일 업로드를 위해 클릭하거나 드래그하세요.
                </UploadDescription>
              </>
            )}
          </UploadBox>

          <FileNameBox>
            <Select
              color={selectedCategory}
              value={selectedCategory}
              onChange={handleCategoryChange}
              defaultValue="">
              <option value="" disabled hidden>
                == 카테고리 선택 ==
              </option>
              <option value="office-photo">내부사진</option>
              <option value="business">협력사</option>
              <option value="job-posting">채용공고</option>
            </Select>
            <FileName>
              <Input
                type="file"
                ref={imageInputRef}
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg,.gif"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512">
                <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
              </svg>
              <span>{selectedFileName || "이미지.png"}</span>
            </FileName>
          </FileNameBox>

          <ButtonBox>
            <div>
              <Button
                color="#000"
                bordercolor="#d2d2d2"
                $backgroundColor="#fff"
                type="button"
                onClick={isModalChange}>
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                color="#fff"
                $backgroundColor="#000"
                bordercolor="#000"
                type="button">
                Upload
              </Button>
            </div>
          </ButtonBox>
        </div>
      </ModalBox>
    </ModalBackground>
  );
};

export default GalleryModal;
