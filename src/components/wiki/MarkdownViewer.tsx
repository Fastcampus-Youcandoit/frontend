import React, { useEffect, useState, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  content: string;
  viewerRef: React.MutableRefObject<any>;
}

const MarkdownViewer = ({ content = "", viewerRef }: Props) => {
  return (
    <div>{content && <Viewer ref={viewerRef} initialValue={content} />}</div>
  );
};

export default MarkdownViewer;
