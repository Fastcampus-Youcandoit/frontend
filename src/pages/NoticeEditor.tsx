import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import write from "../assets/icons/notice_icon/notice_write_icon.png";
import Footer from "../components/common/Footer";
import { db } from "../firebase";
import { ButtonProps } from "../types/notice";
import { useAuth } from "../context/AuthContext";

const Wrap = styled.div`
  height: 100vh;
`;

const WriteBox = styled.div`
  height: 92vh;
  padding: 0 4rem 4rem 4rem;
`;

const BoxHeader = styled.div`
  height: 13%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #868e96;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-family: "NotoSansKR-medium";
`;

const HeaderButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 35%;

  @media (max-width: 425px) {
    height: 30%;
    transition: all 0.5s;
  }
`;

const HeaderButton = styled.button<ButtonProps>`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  font-size: 0.8rem;
  font-family: "NotoSansKR-medium";
  color: #fff;
  border-radius: 5px;
  padding: ${props => props.$pd};
  background-color: ${props => props.$bgColor};
  cursor: pointer;
  transition: transform 0.8s;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.8s;
  }
`;

const WriteButtonIcon = styled.img`
  height: 100%;
`;

const NoticeTitleBox = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 80%;
  font-size: 1rem;
  outline: none;
  font-family: "NotoSansKR-medium";
  border: none;
`;

const EditorBox = styled.div`
  width: 100%;
  height: 77%;
`;

const StyledLink = styled(Link)`
  height: 100%;
`;

const FooterBox = styled.div`
  @media (max-width: 850px) {
    display: none;
  }
`;

const NoticeEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const editorRef: React.MutableRefObject<any> = useRef();
  const [noticeTitle, setNoticeTitle] = useState<string>("");
  const [noticeContent, setNoticeContent] = useState<string>("");

  const handleContentsChange = () => {
    if (editorRef.current) {
      setNoticeContent(editorRef.current.getInstance().getMarkdown());
    }
  };

  const fetchNotice = async () => {
    const noticeDate: Date = new Date();
    const currentDate = `${noticeDate.getFullYear()} ${
      noticeDate.getMonth() + 1
    }/${noticeDate.getDate()} ${noticeDate.getHours()}:${noticeDate.getMinutes()}`;
    const data = {
      title: noticeTitle,
      content: noticeContent,
      date: currentDate,
      author: currentUser?.displayName,
    };

    try {
      if (location.state.id)
        await updateDoc(doc(db, "notice", location.state.id), data);
      else await addDoc(collection(db, "notice"), data);

      navigate("/notice");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = () => {
    if (noticeContent.trim() === "" || noticeTitle.trim() === "")
      alert("제목 또는 내용을 입력해주세요");
    else fetchNotice();
  };

  const fetchData = async () => {
    try {
      const docRef = doc(db, "notice", location.state.id);
      const docSnap = await getDoc(docRef);
      const notice = docSnap.data();
      if (docSnap.exists()) {
        setNoticeTitle(notice?.title);
        setNoticeContent(notice?.content);
        editorRef.current?.getInstance().setMarkdown(notice?.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state.id) {
      fetchData();
    }
  }, []);

  return (
    <Wrap>
      <WriteBox>
        <BoxHeader>
          <HeaderTitle>
            {location.state.id ? "공지사항 수정" : "공지사항 작성"}
          </HeaderTitle>
          <HeaderButtonBox>
            <StyledLink to="/notice">
              <HeaderButton type="button" $bgColor="#000" $pd="0 0.7rem">
                취소
              </HeaderButton>
            </StyledLink>
            <HeaderButton
              type="button"
              $bgColor="#fff"
              $pd="0"
              onClick={handleSaveClick}>
              <WriteButtonIcon src={write} alt="write-icon" />
            </HeaderButton>
          </HeaderButtonBox>
        </BoxHeader>
        <NoticeTitleBox>
          <TitleInput
            type="text"
            placeholder="제목을 입력해주세요."
            value={noticeTitle}
            onChange={e => setNoticeTitle(e.target.value)}
          />
        </NoticeTitleBox>
        <EditorBox>
          {editorRef && (
            <Editor
              height="100%"
              placeholer="내용을 입력해주세요."
              hideModeSwitch
              ref={editorRef}
              onChange={handleContentsChange}
              previewStyle="vertical"
              toolbarItems={[
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol"],
                ["table", "link"],
              ]}
              useCommandShortcut={false}
              plugins={[colorSyntax]}
            />
          )}
        </EditorBox>
      </WriteBox>
      <FooterBox>
        <Footer />
      </FooterBox>
    </Wrap>
  );
};

export default NoticeEditor;
