import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { EventData, SelectEvents, SelectedEvent } from "../../types/home";
import AddEventModal from "./AddEventModal";
import EventDetailModal from "./EventDetailModal";
import { useAuth } from "../../context/AuthContext";

const CalendarBox = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  .fc .fc-toolbar-title::after {
    content: "일정";
    margin-left: 0.5rem;
  }
  .fc .fc-toolbar-title {
    font-family: "NotoSansKR-bold";
    font-size: 1.5rem;
  }

  .fc .fc-button-primary {
    background-color: #f6f7f9;
    border: none;
    color: #7a7b7c;
  }

  .fc-col-header-cell {
    padding: 1rem;
  }

  .fc .fc-button {
    font-family: "NotoSansKR-Medium";
    padding: 0.2rem;
    font-size: 0.9rem;
  }

  .fc .fc-button-group {
    display: inline-flex;
    gap: 0.5rem;
  }
  .fc-theme-standard th {
    background-color: #f6f7f9;
    font-size: 1.1rem;
    font-family: "NotoSansKR-regular";
  }

  .fc .fc-daygrid-day-top {
    font-family: "NotoSansKR-medium";
    font-size: 0.6rem;
  }

  .fc-event {
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
    background-color: rgb(230, 247, 255);
    font-size: 0.5rem;
    font-family: "NotoSansKR-medium";
  }
  .fc-sticky {
    color: #000;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #e9ecef;
  }

  .fc .fc-daygrid-day-frame {
    cursor: pointer;
  }

  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    &:hover {
      background-color: #3997b6;
      transition: 0.3s;
    }
  }
`;

const AddContentButton = styled.button`
  position: absolute;
  right: 10rem;
  top: 1.6rem;
  height: 1.7rem;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  background-color: #3997b6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "NotoSansKR-Medium";
  transition: transform 0.8s;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.8s;
  }
`;

const HomeCalendar = () => {
  const [isAddModal, setIsModal] = useState(false);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [events, setEvents] = useState<EventData[] | []>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData>({
    id: "",
    title: "",
    start: "",
  });
  const { currentUser } = useAuth();

  const handelAddModal = () => {
    setIsModal(!isAddModal);
  };

  const handelDetailModal = () => {
    setIsDetailModal(!isDetailModal);
  };

  const formmatDate = (start: Date): string => {
    const date = new Date(start);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleEventClick = (event: SelectedEvent) => {
    const { id, title, start } = event;
    if (start !== null) {
      const formmatedDate = formmatDate(start);
      setSelectedEvent({
        id,
        title,
        start: formmatedDate,
      });
    }
    handelDetailModal();
  };

  const handleFatchEvent = () => {
    setIsFetched(!isFetched);
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data: EventData[] = [];
    querySnapshot.forEach(doc => {
      data.push(...doc.data().events);
    });
    setEvents(data);
  };

  useEffect(() => {
    fetchData();
  }, [isFetched]);

  return (
    <CalendarBox>
      {isAddModal && (
        <AddEventModal
          isModalChange={handelAddModal}
          handleFatchEvent={handleFatchEvent}
        />
      )}
      {isDetailModal && (
        <EventDetailModal
          isModalChange={handelDetailModal}
          handleFatchEvent={handleFatchEvent}
          selectedEvent={selectedEvent}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
        height="100%"
        locale="ko"
        selectable
        eventClick={info => handleEventClick(info.event)}
      />
      {currentUser?.displayName && (
        <AddContentButton type="button" onClick={handelAddModal}>
          일정 추가하기
        </AddContentButton>
      )}
    </CalendarBox>
  );
};

export default HomeCalendar;
