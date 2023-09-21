export interface ModalProps {
  isModalChange: () => void;
}

export interface StylesProps {
  color?: string;
  bordercolor?: string;
  $backgroundColor?: string;
}

export interface DetailModalProps {
  imageUrl: string;
  onClose: () => void;
}
