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
  > img {
    width: 25px;
    height: 25px;
  }
`;

const InputBox = styled.div`
  display: flex;
  margin: 15px auto 0px 35px;
  > svg {
    margin-right: 5px;
  }
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

        <InputBox>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            // eslint-disable-next-line prettier/prettier
            viewBox="0 0 448 512">
            <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
          </svg>
          <input type="file" accept=".png, .jpg, .jpeg" />
        </InputBox>

        <ModalButtonBox>
          <StyledButton
            color="#000"
            backgroundColor="#fff"
            type="button"
            // eslint-disable-next-line prettier/prettier
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
