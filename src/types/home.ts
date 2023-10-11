export interface EventData {
  id: string;
  start: string;
  title: string;
}

export interface SelectedEvent {
  id: string;
  start: Date | null;
  title: string;
}
export interface CalendarModalProps {
  isModalChange: () => void;
  handleFatchEvent: () => void;
}

export interface CalendarDetailModalProps {
  isModalChange: () => void;
  handleFatchEvent: () => void;
  selectedEvent: EventData;
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
