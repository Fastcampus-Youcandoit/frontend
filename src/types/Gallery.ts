import { useState, useRef } from "react";

export interface ModalProps {
  isModalChange: () => void;
}

export interface stylesProps {
  color?: string;
  bordercolor?: string;
  background?: string;
}

export interface DetailModalProps {
  imageUrl: string;
  onClose: () => void;
}

// 상태 및 ref를 함수 내부에서 정의
export function useModalState() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [imageName, setImageName] = useState<any | null>(null);
  const [categoryName, setCategoryName] = useState<any | null>(null);
  const modalBackgroundRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return {
    selectedFileName,
    setSelectedFileName,
    selectedImage,
    setSelectedImage,
    selectedCategory,
    setSelectedCategory,
    isEdit,
    setIsEdit,
    imageName,
    setImageName,
    categoryName,
    setCategoryName,
    modalBackgroundRef,
    imageInputRef,
  };
}
