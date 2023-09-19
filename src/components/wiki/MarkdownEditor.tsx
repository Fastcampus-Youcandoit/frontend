import React, { useEffect, useRef, useState } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, createSearchParams } from "react-router-dom";
import styled from "styled-components";

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

const MarkdownEditor = ({ content = "", editorRef }: Props) => {
  const toolbarItems = [
    // 툴바 옵션 설정
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
      initialValue={content || " "} // 글 수정 시 사용
      initialEditType="markdown" // wysiwyg & markdown
      previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"} // tab, vertical
      hideModeSwitch
      height="calc(100% - 10rem)"
      theme="" // '' & 'dark'
      usageStatistics={false}
      toolbarItems={toolbarItems}
      useCommandShortcut
      plugins={[colorSyntax]}
    />
  );
};

export default MarkdownEditor;
