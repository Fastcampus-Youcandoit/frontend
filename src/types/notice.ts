export interface NoticeDetailProps {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
}

export interface ButtonProps {
  $bgColor: string;
  $pd: string;
}

export interface DetailType {
  content: string;
  noticeId: string;
  fetchData: () => void;
  $isSelected: boolean;
}
