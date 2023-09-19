import styled from "styled-components";
import React, { useEffect, useState } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
  onContentChange: (content: string) => void;
}

const MarkdownEditor = ({
  content = "",
  editorRef,
  onContentChange,
}: Props) => {
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance(); // ref 내의 getInstance 획득

      if (editorInstance) {
        editorInstance.on("change", async () => {
          const currentValue = editorInstance.getMarkdown();
          onContentChange(currentValue); // 에디터의 내용이 변경될 때마다 부모 컴포넌트에게 알림
        });
      }
    }
  }, [editorRef, content]);

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  return (
    <Editor
      ref={editorRef}
      placeholder="내용을 입력해주세요."
      initialValue={content}
      initialEditType="markdown"
      previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"}
      hideModeSwitch
      height="100%"
      usageStatistics={false}
      toolbarItems={toolbarItems}
      useCommandShortcut
      plugins={[colorSyntax]}
    />
  );
};

export default MarkdownEditor;
