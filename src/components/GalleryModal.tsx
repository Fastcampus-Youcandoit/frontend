import React, { useRef } from "react";
import styled from "styled-components";
import closeIconUrl from "../assets/icons/gallery_icon/image_close_icon.png";
import uploadIconUrl from "../assets/icons/gallery_icon/image_upload_icon.png";

const ModalBackground = styled.div`
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

const ModalBox = styled.div`
  width: 740px;
  height: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 10px;
  z-index: 99;
`;

const CloseButton = styled.button`
  margin: 20px;
  margin-left: auto;
  border: none;
  background: none;
  cursor: pointer;
  > img {
    width: 25px;
    height: 25px;
  }
`;

const UploadBox = styled.div`
  width: 660px;
  height: 250px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px #00000029;
  border: 2px solid #d2d2d2;
  border-radius: 30px;
`;

const ModalUploadIcon = styled.img`
  width: 80px;
  height: 80px;
  text-align: center;
`;

const UploadDescription = styled.p`
  font-size: 18px;
  font-weight: 600;
  font-family: Noto Sans KR;
  margin-top: 20px;
`;

const ModalButtonBox = styled.div`
  margin: auto 20px 20px auto;
`;

interface ButtonProps {
  color?: string;
  backgroundColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  height: 45px;
  padding: 6px 16px;
  margin-left: 15px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${props => props.color || "#000"};
  background-color: ${props => props.backgroundColor || "#fff"};
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  cursor: pointer;
`;

interface ModalProps {
  isModalChange: () => void;
}

const GalleryModal = ({ isModalChange }: ModalProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backgroundRef.current) {
      isModalChange();
    }
  };
  return (
    <ModalBackground onClick={handleClickBackground} ref={backgroundRef}>
      <ModalBox>
        <CloseButton type="button" onClick={isModalChange}>
          <img src={closeIconUrl} alt="close icon" />
        </CloseButton>
        <UploadBox>
          <ModalUploadIcon src={uploadIconUrl} alt="upload icon" />
          <UploadDescription>
            파일 업로드를 위해 클릭하거나 드래그하세요.
          </UploadDescription>
        </UploadBox>
        <input type="file" />
        <ModalButtonBox>
          <StyledButton
            color="#000"
            backgroundColor="#fff"
            type="button"
            onClick={isModalChange}>
            Cancel
          </StyledButton>
          <StyledButton color="#fff" backgroundColor="#000" type="button">
            OK
          </StyledButton>
        </ModalButtonBox>
      </ModalBox>
    </ModalBackground>
  );
};

export default GalleryModal;
