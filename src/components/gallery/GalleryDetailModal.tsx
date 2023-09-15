import React from "react";
import styled from "styled-components";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
import { ModalBackground } from "./GalleryModal";
import { CloseButton } from "./GalleryModal";
import { ButtonBox, Button } from "./GalleryModal";

interface DetailModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ModalBox = styled.div`
  width: 1000px;
  height: 800px;
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
`;

const Description = styled.p`
  font: normal normal bold 20px/32px Noto Sans KR;
  margin: 20px auto 20px 135px;
  width: 700px;
  white-wrap: nowrap;
  border-box: box-sizing;
  overflow-y: scroll;
`;

const GalleryDetailModal: React.FC<DetailModalProps> = ({
  imageUrl,
  onClose,
}) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeIconUrl} alt="close icon" />
        </CloseButton>
        <DetailImage src={imageUrl} alt="Image Detail" />
        <Description>
          이미지의 상세 설명입니다. 이미지의 상세한 설명입니다. 이미지의 상세
          설명입니다. 이미지의 상세한 설명입니다. 이미지의 상세 설명입니다.
          이미지의 상세한 설명입니다. 이미지의 상세 설명입니다. 이미지의 상세한
          설명입니다. 이미지의 상세 설명입니다. 이미지의 상세한 설명입니다.
          이미지의 상세 설명입니다. 이미지의 상세한 설명입니다. 이미지의 상세
          설명입니다. 이미지의 상세한 설명입니다. 이미지의 상세 설명입니다.
          이미지의 상세한 설명입니다. 이미지의 상세 설명입니다. 이미지의 상세한
          설명입니다. 이미지의 상세 설명입니다. 이미지의 상세한 설명입니다.
          이미지의 상세 설명입니다. 이미지의 상세한 설명입니다. 이미지의 상세
          설명입니다. 이미지의 상세한 설명입니다.
        </Description>
        <ButtonBox>
          <Button
            color="#000"
            borderColor="#000"
            backgroundColor="#fff"
            type="button">
            Delete
          </Button>
          <Button color="#fff" backgroundColor="#000" type="button">
            Save
          </Button>
        </ButtonBox>
      </ModalBox>
    </ModalBackground>
  );
};

export default GalleryDetailModal;
