import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";

const ContentBox = styled.div`
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  padding: 15px;
  margin: 8px 20px 8px 45px;
`;

const NoticeDetailStyle = styled.div<{ isSelected: boolean }>`
  display: ${props => (props.isSelected ? "block" : "none")};
`;

const NoticeListButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NoticeEditButton = styled.button`
  width: 60px;
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  color: #087ea4;
  background-color: #e6f7ff;
  margin-right: 10px;
  font-family: "NotoSansKR-Medium";
`;

const NoticeDeleteButton = styled.button`
  width: 60px;
  cursor: pointer;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin: 0 20px 10px 0;
  color: #fff;
  background-color: #c62917;
  font-family: "NotoSansKR-Medium";
`;

interface DetailType {
  content: string;
  noticeId: string;
  fetchData: () => void;
  isSelected: boolean;
}

const NoticeDetail = ({
  content,
  noticeId,
  fetchData,
  isSelected,
}: DetailType) => {
  const deleteNotice = async () => {
    try {
      await deleteDoc(doc(db, "notice", noticeId));
      fetchData();
    } catch (error) {
      console.log();
    }
  };

  const handleDeleteButton = () => {
    if (window.confirm("해당 공지를 삭제하시겠습니까?")) deleteNotice();
  };

  return (
    <NoticeDetailStyle isSelected={isSelected}>
      {content && (
        <ContentBox>
          <Viewer initialValue={content} />
        </ContentBox>
      )}
      <NoticeListButton>
        <Link to="/notice/edit" state={{ id: noticeId }}>
          <NoticeEditButton>수정</NoticeEditButton>
        </Link>
        <NoticeDeleteButton onClick={handleDeleteButton}>
          삭제
        </NoticeDeleteButton>
      </NoticeListButton>
    </NoticeDetailStyle>
  );
};

export default NoticeDetail;
