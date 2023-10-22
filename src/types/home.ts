export type EventData = {
  date: string;
  title: string;
};

export interface CalendarModalProps {
  isModalChange: () => void;
  handleFatchEvent: () => void;
}

export interface CalendarDetailModalProps extends CalendarModalProps {
  selectedEventId: string;
}

export interface ImageFilesType {
  business: string[];
  jobPosting: string[];
  officePhoto: string[];
}

export interface NoticeType extends EventData {
  id: string;
  content: string;
  author: string;
}
