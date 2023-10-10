export type EventData = {
  id?: string;
  date: string;
  title: string;
};

export interface CalendarModalProps {
  isModalChange: () => void;
  handleFatchEvent: () => void;
}

export interface CalendarDetailModalProps {
  isModalChange: () => void;
  selectedDay: string;
  handleFatchEvent: () => void;
}

export interface SelectEvents {
  id: string;
  date: string;
  title: string;
  eventId: string;
}

export interface ImageFilesType {
  business: string[];
  jobPosting: string[];
  officePhoto: string[];
}

export interface NoticeType {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
}
