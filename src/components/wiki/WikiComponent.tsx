import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownViewer from "./MarkdownViewer";
import writeIcon from "../../assets/icons/wiki_icon/wiki_write_icon.png";
import checkIcon from "../../assets/icons/wiki_icon/wiki_check_icon.png";

const WikiContentBox = styled.div`
  width: 75vw;
  font-family: "NotoSansKR-Regular";
`;

const WikiHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

const WikiMainText = styled.span`
  font-size: 25px;
  font-family: "NotoSansKR-bold";
`;

const WriteIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const WikiContent = styled.div`
  width: 100%;
  height: 70vh;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`;

const WikiFooter = styled.div`
  margin-top: 10px;
`;

const ModificationDate = styled.span`
  font-size: 15px;
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ViewerMarginContainer = styled.div`
  margin: 16px;
`;

interface WikiParams {
  pageName: string;
}

const WikiComponent = () => {
  const params = useParams<Record<string, string | undefined>>();
  const pageName = params.pageName || "company-rules";

  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = useRef(location.pathname);

  const pageTitleMapping: Record<string, string> = {
    "company-rules": "회사내규",
    "team-introduction": "팀 소개",
    "organization-chart": "조직도",
    "in-progress": "진행중인 프로젝트",
    upcoming: "예정된 프로젝트",
    completed: "완료된 프로젝트",
    "reading-list": "신입사원 필독서",
    topics: "온보딩 주제",
  };

  // Markdown Editor & Viewer
  const markdownRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");

  const getContent = async () => {
    const docRef = doc(db, "wiki", pageName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setContent(docSnap.data().text);
    } else {
      console.log("No such document!");
      setContent("Document not found :(");
    }
  };

  const uploadContent = async (newContent: string) => {
    // Add a new document in collection "..."
    await setDoc(doc(db, "wiki", pageName), {
      text: newContent,
    });
  };

  useEffect(() => {
    if (previousLocation.current !== location.pathname && editMode) {
      setEditMode(false);
    }
    previousLocation.current = location.pathname;
  }, [location, editMode]);

  useEffect(() => {
    getContent();
  }, [pageName]);

  return (
    <WikiContentBox>
      <WikiHeader>
        <WikiMainText>{pageTitleMapping[pageName] || "회사내규"}</WikiMainText>
        <WriteIcon
          src={editMode ? checkIcon : writeIcon}
          onClick={() => {
            if (editMode) {
              uploadContent(content); // 변경된 내용을 Firebase에 업로드
            }
            setEditMode(!editMode);
          }}
        />
      </WikiHeader>
      <WikiContent>
        <EditorContainer>
          <ViewerMarginContainer>
            {editMode === false && (
              <MarkdownViewer content={content} viewerRef={markdownRef} />
            )}
          </ViewerMarginContainer>
          {editMode === true && (
            <MarkdownEditor
              content={content}
              editorRef={markdownRef}
              onContentChange={newContent => setContent(newContent)} // 에디터에서 변경된 내용을 현재 컴포넌트의 상태로 업데이트
            />
          )}
        </EditorContainer>
      </WikiContent>
      <WikiFooter>
        <ModificationDate>최종 수정일 : </ModificationDate>
      </WikiFooter>
    </WikiContentBox>
  );
};

export default WikiComponent;
