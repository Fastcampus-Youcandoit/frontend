import { getAuth } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import closeIconUrl from "../../assets/icons/gallery_icon/image_close_icon.png";
import { db } from "../../firebase";
import { CloseButton } from "../gallery/GalleryModal";
import {
  Buttons,
  Clock,
  CurrentTime,
  CurrentTimeLayout,
  HeaderWrapper,
  Header,
  Modal,
  ModalLayout,
  OkayButton,
  OkayButtonDiv,
  TodayDate,
  WorkOnOff,
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
const setWorkingTime = async (currentTime: Date, user: any) => {
  await setDoc(doc(db, "time", user.uid), {
    uid: user.uid,
    이름: user.displayName,
    출근시간: currentTime,
  });
};
// firestore에 퇴근시간 등록 (퇴근버튼 클릭시)
const deleteWorkingTime = async (user: any) => {
  await deleteDoc(doc(db, "time", user.uid));
};

// CommuteModalComponent
const CommuteModal: React.FC<CommuteModalProps> = ({
  workonoff,
  setWorkonoff,
  setModalOpen,
  workingHours,
}) => {
  const formattedDate = getTodayDate();
  let currentTime: Date;
  const [clock, setClock] = useState("00:00:00");
  const auth = getAuth();
  const user = auth.currentUser;

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
        setWorkingTime(currentTime, user);
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
        deleteWorkingTime(user);
        // eslint-disable-next-line no-alert
        alert("퇴근처리됐습니다!");
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
        <HeaderWrapper>
          <div>
            <Header>출&middot;퇴근</Header>
            <TodayDate> {formattedDate}</TodayDate>
          </div>
          <CloseButton type="button" onClick={handleOkayButton}>
            <img src={closeIconUrl} alt="close icon" />
          </CloseButton>
        </HeaderWrapper>

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
          <OkayButton
            onClick={handleOkayButton}
            workonoff={workonoff}
            color="#000"
            $borderColor="#d2d2d2"
            $backgroundColor="#fff">
            Cancel
          </OkayButton>
          <OkayButton
            onClick={handleOkayButton}
            workonoff={workonoff}
            color="#fff"
            $borderColor="#000"
            $backgroundColor="#000">
            OK
          </OkayButton>
        </OkayButtonDiv>
      </Modal>
    </ModalLayout>
  );
};

export default CommuteModal;
