import React, { useEffect, useState } from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Modal,
  ModalLayout,
  Header,
  TodayDate,
  CurrentTimeLayout,
  CurrentTime,
  Clock,
  Buttons,
  WorkOnOff,
  OkayButtonDiv,
  OkayButton,
} from "./StyleComponentCommute";

// props type 설정
interface CommuteModalProps {
  workonoff: boolean;
  setWorkonoff: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workingHours: string;
}

// 현재 날짜를 가져옵니다.
const getTodayDate = () => {
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()} ${
    week[today.getDay()]
  }`;
};

// 현재 시간을 가져옵니다.
const getCurentTime = (currentTime: Date) => {
  const hours: string = currentTime.getHours().toString().padStart(2, "0");
  const minutes: string = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds: string = currentTime.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// firestore에 출근시간 등록 (출근버튼 클릭시)
const setWorkingTime = async (currentTime: Date) => {
  await setDoc(doc(db, "time", "workStartTime"), {
    time: currentTime,
  });
};

// firestore에 퇴근시간 등록 (퇴근버튼 클릭시)
const deleteWorkingTime = async () => {
  await deleteDoc(doc(db, "time", "workStartTime"));
};

const CommuteModal: React.FC<CommuteModalProps> = ({
  workonoff,
  setWorkonoff,
  setModalOpen,
  workingHours,
}) => {
  const formattedDate = getTodayDate();
  let currentTime: Date;
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const Timer = setInterval(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      currentTime = new Date();
      setClock(getCurentTime(currentTime));
    }, 1000);
    // console.log("mount!");
    return () => {
      clearInterval(Timer);
      // console.log("unmount!");
    };
  }, []);

  const handleSetOnOff = () => {
    // 출근버튼 클릭시
    if (!workonoff) {
      currentTime = new Date();
      // eslint-disable-next-line no-alert
      if (
        // eslint-disable-next-line no-alert
        window.confirm(`
       ${getTodayDate()}  
       ${getCurentTime(currentTime).toString()}  출근처리하시겠습니까?`)
      ) {
        setWorkonoff(true);
        setWorkingTime(currentTime);
        setModalOpen(false);
      }
    }
    // 퇴근버튼 클릭시
    if (workonoff) {
      currentTime = new Date();
      if (
        // eslint-disable-next-line no-alert
        window.confirm(`
      ${getTodayDate()}  
      ${getCurentTime(currentTime).toString()}  퇴근처리하시겠습니까?`)
      ) {
        setWorkonoff(false);
        deleteWorkingTime();
        // eslint-disable-next-line no-alert
        alert("퇴근처리됬습니다!");
        setModalOpen(false);
      }
    }
  };

  // okaybutton 클릭
  const handleOkayButton = () => {
    setModalOpen(false);
  };

  return (
    <ModalLayout>
      <Modal>
        <Header>출&middot;퇴근</Header>
        <TodayDate> {formattedDate}</TodayDate>
        <CurrentTimeLayout>
          <CurrentTime>
            {workonoff && <span>On</span>}
            <Clock workonoff={workonoff}>{clock}</Clock>
          </CurrentTime>
          <Buttons className="modal-workOn-buttons">
            <button type="button" disabled>
              {workonoff ? `${workingHours}시간째 근무중` : "출근전"}
            </button>
            <WorkOnOff workonoff={workonoff} onClick={handleSetOnOff}>
              {workonoff ? "퇴근" : "출근"}
            </WorkOnOff>
          </Buttons>
        </CurrentTimeLayout>
        <OkayButtonDiv>
          <OkayButton onClick={handleOkayButton} workonoff={workonoff}>
            OK
          </OkayButton>
        </OkayButtonDiv>
      </Modal>
    </ModalLayout>
  );
};

export default CommuteModal;
