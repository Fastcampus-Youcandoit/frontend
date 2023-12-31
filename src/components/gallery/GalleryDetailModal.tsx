import { deleteObject, ref, uploadString } from "firebase/storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../../assets/fonts/Font.css";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { DetailModalProps } from "../../types/gallery";
import {
  Button,
  ButtonBox,
  CloseButton,
  FileName,
  ImagePreview,
  Input,
  ModalBackground,
  ModalBox,
  ModalUploadIcon,
  UploadBox,
  UploadDescription,
} from "./GalleryModal";

const DetailModalBox = styled(ModalBox)`
  width: 55vw;
  > div {
    width: 55vw;
    margin: 0 auto;
    padding: 0.8rem;
    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    width: 75vw;
  }
`;

const DetailImage = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;

  > img {
    width: 100%;
  }
`;

const DetailUploadBox = styled(UploadBox)`
  width: 100%;
  height: 28vw;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 41.7vw;
  }
`;

const DetailImagePreview = styled(ImagePreview)`
  width: 100%;
  height: 28vw;
`;

const DetailFileNameBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const Category = styled.div`
  font-size: 0.9rem;
  display: flex;
  justify-content: flex-end;
  font-family: "NotoSansKR-Medium";
  color: #808080;
`;

const EditCategory = styled.p`
  font-family: "NotoSansKR-Medium";
  font-size: 0.8rem;
`;

const GalleryDetailModal: React.FC<DetailModalProps> = ({
  imageUrl,
  onClose,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [imageName, setImageName] = useState<any | null>(null);
  const [categoryName, setCategoryName] = useState<any | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useAuth();

  // get image name
  const getImageName = () => {
    const url = imageUrl;
    const parts = url.split("/");
    const encodedFileName = parts[parts.length - 1].split("?")[0];
    const imageFileName = decodeURIComponent(encodedFileName);
    setImageName(imageFileName);
  };

  const getCategoryName = () => {
    if (imageName) {
      const parts = imageName?.split("/");
      const category = parts[1].toUpperCase();
      setCategoryName(category);
    }
  };

  useEffect(() => {
    getImageName();
    getCategoryName();

    return () => {
      setImageName(null);
      setCategoryName(null);
    };
  }, [imageName, categoryName]);

  // image handleIsedit
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  // image delete
  const deleteImage = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("이미지를 삭제하시겠습니까?")) {
      try {
        // 이미지 삭제
        const imageRef = ref(storage, imageName);
        await deleteObject(imageRef);
        alert("선택한 이미지가 삭제되었습니다.");
        window.location.href = "/gallery/all";
      } catch (error: unknown | Error) {
        const errorMessage = `이미지 삭제에 실패하였습니다. \n\nerror: ${error}`;
        alert(errorMessage);
      }
    } else {
      alert("이미지 삭제를 취소하셨습니다.");
    }
  };

  // click input
  const handleInputFile = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
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

  // image update
  const handleImageUpdate = async () => {
    if (!selectedImage) {
      alert("파일을 선택해주세요.");
    }
    try {
      if (selectedImage) {
        // 이미지 삭제
        const imageRef = ref(storage, imageName);
        await deleteObject(imageRef);
        // 이미지 업로드
        const storageRef = ref(
          storage,
          `images/${categoryName.toLowerCase()}/${selectedFileName}`,
        );
        await uploadString(storageRef, selectedImage, "data_url");
        alert("이미지가 변경되었습니다.");
        window.location.href = "/gallery/all";
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <DetailModalBox onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeIconUrl} alt="close icon" />
        </CloseButton>
        <div>
          {isEdit ? (
            <DetailUploadBox
              onClick={handleInputFile}
              onDrop={handleDrag}
              onDragOver={e => e.preventDefault()}>
              {selectedImage ? (
                <DetailImagePreview src={selectedImage} alt="미리보기" />
              ) : (
                <>
                  <ModalUploadIcon src={uploadIconUrl} alt="upload icon" />
                  <UploadDescription>
                    파일 업로드를 위해 클릭하거나 드래그하세요.
                  </UploadDescription>
                </>
              )}
            </DetailUploadBox>
          ) : (
            <DetailImage>
              <img src={imageUrl} alt="Detail img" loading="lazy" />
            </DetailImage>
          )}

          <DetailFileNameBox>
            {isEdit && <EditCategory>{categoryName} | </EditCategory>}
            <FileName>
              {isEdit && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512">
                  <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                </svg>
              )}
              <Input
                type="file"
                ref={imageInputRef}
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg,.gif"
              />

              {isEdit ? (
                <span>{selectedFileName || "이미지.png"}</span>
              ) : (
                <Category>CATEGORY | {categoryName}</Category>
              )}
            </FileName>
          </DetailFileNameBox>

          <ButtonBox>
            {isEdit ? (
              <>
                <Button
                  onClick={() => setIsEdit(!isEdit)}
                  color="#000"
                  bordercolor="#000"
                  $backgroundColor="#fff"
                  type="button">
                  Cancel
                </Button>
                <Button
                  color="#000"
                  bordercolor="#000"
                  $backgroundColor="#fff"
                  type="button"
                  onClick={deleteImage}>
                  Delete
                </Button>
                <Button
                  onClick={handleImageUpdate}
                  color="#fff"
                  $backgroundColor="#000"
                  bordercolor="#000"
                  type="button">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onClose}
                  color="#000"
                  bordercolor="#000"
                  $backgroundColor="#fff"
                  type="button">
                  Cancel
                </Button>
                {currentUser && (
                  <Button
                    onClick={handleIsEdit}
                    color="#fff"
                    $backgroundColor="#000"
                    bordercolor="#000"
                    type="button">
                    Edit
                  </Button>
                )}
              </>
            )}
          </ButtonBox>
        </div>
      </DetailModalBox>
    </ModalBackground>
  );
};

export default GalleryDetailModal;
