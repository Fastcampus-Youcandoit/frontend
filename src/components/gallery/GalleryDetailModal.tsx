import React from "react";
import styled from "styled-components";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
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
  margin-top: -20px;
`;

const Description = styled.p`
  font: normal normal bold 12px/20px Noto Sans KR;
  margin: 10px auto 5px 120px;
  width: 700px;
  color: #949494;
`;

const Content = styled.p`
  font: normal normal bold 20px/32px Noto Sans KR;
  margin: 0px auto 20px 120px;
  width: 700px;
  white-wrap: nowrap;
  border-box: box-sizing;
  overflow-y: scroll;
`;

const GalleryDetailModal: React.FC<DetailModalProps> = ({
  imageUrl,
  onClose,
}) => {
  // image delete
  const deleteImage = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("이미지를 삭제하시겠습니까?")) {
      try {
        const url = imageUrl;
        const parts = url.split("/");
        const encodedFileName = parts[parts.length - 1].split("?")[0];
        const decodedFileName = decodeURIComponent(encodedFileName);

        // 이미지 삭제
        const imageRef = ref(storage, decodedFileName);
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

  return (
    <ModalBackground onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeIconUrl} alt="close icon" />
        </CloseButton>
        <DetailImage src={imageUrl} alt="Image Detail" />
        <Description>Category | yyyy-mm-dd</Description>
        <Content>
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
        </Content>
        <ButtonBox>
          <Button
            color="#000"
            borderColor="#000"
            backgroundColor="#fff"
            type="button"
            onClick={deleteImage}>
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
