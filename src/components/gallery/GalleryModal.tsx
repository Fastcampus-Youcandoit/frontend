import { ref, uploadString } from "firebase/storage";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";
import { storage } from "../../firebase";
import { ModalProps, stylesProps } from "../../types/gallery";

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
  width: 46rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 0.625rem;
  z-index: 99;
`;

export const CloseButton = styled.button`
  margin: 1.25rem;
  margin-left: auto;
  border: none;
  background: none;
  cursor: pointer;
  > img {
    width: 1.5625rem;
    height: 1.5625rem;
  }
`;

export const UploadBox = styled.div`
  width: 37.5rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
  box-shadow: 0px 3px 6px #00000029;
  border: 2px solid #d2d2d2;
  border-radius: 30px;
  cursor: pointer;
`;

export const ImagePreview = styled.img`
  width: 37.5rem;
  height: 20rem;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: 0px 3px 6px #00000029;
`;

export const ModalUploadIcon = styled.img`
  width: 5rem;
  height: 5rem;
  text-align: center;
`;

export const UploadDescription = styled.p`
  font: normal normal bold 20px/32px Noto Sans KR;
  margin-top: 1.25rem;
  > img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const FileNameBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1.28rem auto 0px 4rem;
  > svg {
    margin-right: 0.2rem;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const FileName = styled.p`
  margin-left: 0.3rem;
  text-align: center;
  font: normal normal bold 1rem/1.1rem Noto Sans KR;
`;

export const ButtonBox = styled.div`
  margin: auto 1.25rem 1.25rem auto;
`;

export const Button = styled.button<stylesProps>`
  padding: 0.37rem 1rem;
  margin-left: 0.9rem;
  text-align: center;
  font: normal normal bold 1.25rem/1.8rem Noto Sans KR;
  border: 2px solid ${props => props.bordercolor || "#d2d2d2"};
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.$backgroundColor || "#fff"};
  transition: transform 0.8s;
  &:hover {
    transform: scale(1.08);
    transition: transform 0.8s;
  }
`;

export const Select = styled.select<stylesProps>`
  margin-right: 0.5rem;
  color: ${props => (props.color ? "#000" : "#808080")};
  padding: 0.1rem 0.2rem;
  border: 1px solid #000;
  font: normal normal bold 0.9rem Noto Sans KR;
  border-radius: 3px;
  > option {
    border: inherit;
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512">
            <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
          </svg>
          <Input
            type="file"
            ref={imageInputRef}
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.gif"
          />
          <FileName>{selectedFileName || "이미지.png"}</FileName>
        </FileNameBox>

        <ButtonBox>
          <Button
            color="#000"
            bordercolor="#000"
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
        </ButtonBox>
      </ModalBox>
    </ModalBackground>
  );
};

export default GalleryModal;
