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
  const handleChange = () => {
    if (editorRef.current) {
      const updatedContent = editorRef.current.getInstance().getMarkdown();
      onContentChange(updatedContent);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance?.();

      if (editorInstance) {
        if (editorInstance.eventManager) {
          editorInstance.eventManager.addEventType("myKeyPress");

          editorInstance.addHook("myKeyPress", handleChange);

          editorInstance.getEditor().addEventListener("keydown", (e: any) => {
            if (e.key === "Enter" && e.ctrlKey) {
              editorInstance.eventManager.emit("myKeyPress");
            }
          });
        }

        editorInstance.setMarkdown(content);
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
      key={content}
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
