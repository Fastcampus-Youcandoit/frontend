import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import uuid from "react-uuid";
import { db } from "../../firebase";
import { CalendarModalProps, EventData } from "../../types/home";

const ModalArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
  gap: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-family: "NotoSansKR-bold";
  margin-bottom: 1rem;
`;

const SelectDate = styled.input`
  font-size: 0.8rem;
  width: 100%;
  height: 3rem;
  font-family: "NotoSansKR-bold";
  border: 1px solid #adb5bd;
  border-radius: 5px;
  padding: 0 0.5rem;
`;

const DateTitle = styled.input`
  width: 100%;
  height: 3rem;
  font-family: "NotoSansKR-regular";
  border: 1px solid #adb5bd;
  border-radius: 5px;
  padding: 0 0.5rem;
`;

const ModalButtonBox = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ModalButton = styled.button`
  cursor: pointer;
  color: black;
  background-color: #dee2e6;
  border: none;
  font-size: 0.8rem;
  font-family: "NotoSansKR-medium";
  padding: 0.5rem 2rem;
  border-radius: 5px;
`;

const HomeCalendarModal = ({
  isModalChange,
  handleFatchEvent,
}: CalendarModalProps) => {
  const eventId = uuid();
  const eventsRef = doc(db, "events", eventId);
  const [eventInfo, setEventInfo] = useState<EventData>({
    id: eventId,
    title: "",
    date: "",
  });

  const updateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEventInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEvent = async () => {
    try {
      await setDoc(eventsRef, eventInfo);
      isModalChange();
      handleFatchEvent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalArea>
      <ModalBox>
        <ModalTitle>일정 추가하기</ModalTitle>
        <SelectDate
          type="date"
          name="date"
          value={eventInfo.date}
          onChange={updateEvent}
        />
        <DateTitle
          type="text"
          value={eventInfo.title}
          placeholder="일정을 입력해주세요."
          name="title"
          onChange={updateEvent}
        />
        <ModalButtonBox>
          <ModalButton type="button" onClick={handleAddEvent}>
            일정 추가
          </ModalButton>
          <ModalButton type="button" onClick={isModalChange}>
            뒤로가기
          </ModalButton>
        </ModalButtonBox>
      </ModalBox>
    </ModalArea>
  );
};

export default HomeCalendarModal;
