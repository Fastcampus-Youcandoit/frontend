export interface ModalProps {
  isModalChange: () => void;
}

export interface GalleryProps {
  color?: string;
  bordercolor?: string;
  $backgroundColor?: string;
}

export interface DetailModalProps {
  imageUrl: string;
  onClose: () => void;
}
