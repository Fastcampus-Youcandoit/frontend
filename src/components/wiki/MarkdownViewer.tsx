import { useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

interface Props {
  content: string;
  viewerRef: React.MutableRefObject<any>;
}

const MarkdownViewer = ({ content = "", viewerRef }: Props) => {
  const [temp, setTemp] = useState(0); // 강제 렌더링 용도

  useEffect(() => {
    // 강제 렌더링 로직
    setTemp(x => x + 1);
    setTimeout(() => {
      setTemp(x => x + 1);
    });
  }, [content]);

  return (
    <div>
      {content && temp % 2 === 0 && (
        <Viewer ref={viewerRef} initialValue={content} />
      )}
    </div>
  );
};

export default MarkdownViewer;
