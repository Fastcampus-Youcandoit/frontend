import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { deleteObject, ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
import uploadIconUrl from "../../assets/icons/gallery_icon/image_upload_icon.png";
import {
  ModalBackground,
  CloseButton,
  ButtonBox,
  Button,
} from "./GalleryModal";

interface DetailModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ModalBox = styled.div`
  width: 950px;
  height: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 10px;
  z-index: 99;
`;

const DetailImage = styled.img`
  width: 700px;
  height: auto;
  max-height: 100%;
  margin-top: -20px;
`;

const Content = styled.p`
  font: normal normal normal 16px/32px Noto Sans KR;
  margin: 10px auto 20px 120px;
  width: 700px;
  white-wrap: nowrap;
  border-box: box-sizing;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 100px;
  }
`;

const UploadBox = styled.div`
  width: 700px;
  height: 460px;
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

const ImagePreview = styled.img`
  width: 700px;
  height: 360px;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 0px 3px 6px #00000029;
`;

const ModalUploadIcon = styled.img`
  width: 80px;
  height: 80px;
  text-align: center;
`;

const UploadDescription = styled.p`
  font: normal normal bold 20px/32px Noto Sans KR;
  margin-top: 20px;
  > img {
    width: 25px;
    height: 25px;
  }
`;

const FileNameBox = styled.div`
  display: flex;
  margin: 20px auto 0px 120px;
  > svg {
    margin-right: 3px;
  }
`;

const Input = styled.input`
  display: none;
`;

const FileName = styled.p`
  margin-left: 5px;
  text-align: center;
  font: normal normal bold 16px/18px Noto Sans KR;
`;

const GalleryDetailModal: React.FC<DetailModalProps> = ({
  imageUrl,
  onClose,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [imageName, setImageName] = useState<any | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // get image name
  const getImageName = () => {
    const url = imageUrl;
    const parts = url.split("/");
    const encodedFileName = parts[parts.length - 1].split("?")[0];
    const imageFileName = decodeURIComponent(encodedFileName);
    setImageName(imageFileName);
  };

  useEffect(() => {
    getImageName();

    return () => {
      setImageName(null);
    };
  }, []);

  // image edit
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
        window.location.href = "/gallery";
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
        const storageRef = ref(storage, `images/${selectedFileName}`);
        await uploadString(storageRef, selectedImage, "data_url");
        alert("이미지가 변경되었습니다.");
        window.location.href = "/gallery";
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeIconUrl} alt="close icon" />
        </CloseButton>
        {isEdit ? (
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
        ) : (
          <DetailImage src={imageUrl} alt="Image Detail" />
        )}

        <FileNameBox>
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

          <FileName>
            {isEdit ? selectedFileName || "이미지.png" : imageName}
          </FileName>
        </FileNameBox>

        <Content>
          이미지의 상세 설명입니다.
          <br />
          이미지에 관련된 설명을 확인할 수 있습니다.
          <br />
          이미지의 상세 설명입니다.
          <br />
          이미지에 관련된 설명을 확인할 수 있습니다.
          <br />
          이미지의 상세 설명입니다.
          <br />
          이미지에 관련된 설명을 확인할 수 있습니다.
          <br />
          이미지의 상세 설명입니다.
          <br />
          이미지에 관련된 설명을 확인할 수 있습니다.
          <br />
        </Content>
        <ButtonBox>
          {isEdit ? (
            <>
              <Button
                onClick={() => setIsEdit(!isEdit)}
                color="#000"
                borderColor="#000"
                backgroundColor="#fff"
                type="button">
                Cancel
              </Button>
              <Button
                color="#000"
                borderColor="#000"
                backgroundColor="#fff"
                type="button"
                onClick={deleteImage}>
                Delete
              </Button>
              <Button
                onClick={handleImageUpdate}
                color="#fff"
                backgroundColor="#000"
                type="button">
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onClose}
                color="#000"
                borderColor="#000"
                backgroundColor="#fff"
                type="button">
                Cancel
              </Button>
              <Button
                onClick={handleIsEdit}
                color="#fff"
                backgroundColor="#000"
                type="button">
                Edit
              </Button>
            </>
          )}
        </ButtonBox>
      </ModalBox>
    </ModalBackground>
  );
};

export default GalleryDetailModal;
