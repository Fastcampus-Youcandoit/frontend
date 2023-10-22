import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { CalendarDetailModalProps, EventData } from "../../types/home";

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
  padding: 1.5rem 3rem;
  gap: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-family: "NotoSansKR-bold";
  margin-bottom: 1rem;
`;

const EventsDay = styled.h3`
  font-size: 1.3rem;
  font-family: "NotoSansKR-bold";
  margin-bottom: 1rem;
`;

const EventBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DateTitle = styled.h2`
  width: 100%;
  height: 2.5rem;
  font-family: "NotoSansKR-regular";
  border-radius: 5px;
  border: 1.2px solid #d2d2d2;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
`;

const ModalButtonBox = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ModalButton = styled.button<{ $backgroundColor: string }>`
  cursor: pointer;
  color: black;
  background-color: ${props =>
    props.$backgroundColor ? props.$backgroundColor : "#dee2e6"};
  border: none;
  font-size: 0.8rem;
  font-family: "NotoSansKR-medium";
  padding: 0.5rem 2rem;
  border-radius: 5px;
`;

const EditInput = styled.input`
  width: 100%;
  height: 3rem;
  font-family: "NotoSansKR-regular";
  border: 1px solid #adb5bd;
  border-radius: 5px;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
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

const EventDetailModal = ({
  isModalChange,
  selectedEventId,
  handleFatchEvent,
}: CalendarDetailModalProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventData>({
    title: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    const dayRef = doc(db, "events", selectedEventId);
    const docSnap = await getDoc(dayRef);
    if (docSnap.exists()) {
      const eventData = docSnap.data();
      const { date, title } = eventData;
      setSelectedEvent({
        date,
        title,
      });
    }
  };

  const updateEventData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSelectedEvent(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUpdatedEvent = async () => {
    const { title, date } = selectedEvent;
    try {
      const selectedEventRef = doc(db, "events", selectedEventId);
      await updateDoc(selectedEventRef, {
        title,
        date,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedEvent = async () => {
    const shouldDelete = window.confirm("이벤트를 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deleteDoc(doc(db, "events", selectedEventId));
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditModal = () => {
    handleFatchEvent();
    isModalChange();
  };

  useEffect(() => {
    fetchData();
  }, [selectedEventId, isEditing]);

  return (
    <ModalArea>
      <ModalBox>
        {!isEditing && (
          <>
            <ModalTitle>상세 일정 보기</ModalTitle>
            <EventsDay>{selectedEvent.date}</EventsDay>
            <EventBox>
              <DateTitle>{selectedEvent.title}</DateTitle>
            </EventBox>
            <ModalButtonBox>
              <ModalButton
                type="button"
                onClick={handleEditClick}
                $backgroundColor="#3997b6">
                선택 일정 수정
              </ModalButton>
              <ModalButton
                type="button"
                onClick={handleEditModal}
                $backgroundColor="">
                뒤로가기
              </ModalButton>
            </ModalButtonBox>
          </>
        )}
        {isEditing && (
          <>
            <ModalTitle>일정 수정</ModalTitle>
            <SelectDate
              type="date"
              name="date"
              value={selectedEvent.date}
              onChange={updateEventData}
            />
            <EventBox>
              <EditInput
                type="text"
                name="title"
                value={selectedEvent.title}
                onChange={updateEventData}
              />
            </EventBox>
            <ModalButtonBox>
              <ModalButton
                type="button"
                onClick={fetchUpdatedEvent}
                $backgroundColor="#3997b6">
                일정 저장
              </ModalButton>
              <ModalButton
                type="button"
                onClick={deleteSelectedEvent}
                $backgroundColor="#f1f3f5">
                일정 삭제
              </ModalButton>
              <ModalButton
                type="button"
                onClick={() => setIsEditing(false)}
                $backgroundColor="">
                수정 취소
              </ModalButton>
            </ModalButtonBox>
          </>
        )}
      </ModalBox>
    </ModalArea>
  );
};

export default React.memo(EventDetailModal);
