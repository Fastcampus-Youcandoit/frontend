import React, { useState, useEffect } from "react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import CommuteModal from "./CommuteModal";
import { db } from "../../firebase";
import { Span, CommuteButton, WorkOnMark } from "./StyleComponentCommute";

const CommuteButtonComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [workonoff, setWorkonoff] = useState<boolean>(false);
  const [workOnTime, setWorkOnTime] = useState<string>("00:00:00");
  const [workingHours, setWorkingHours] = useState<string>("0");

  // 일한 시간을 설정합니다
  const getWorkingTime = async (currentTime: Date) => {
    const querySnapshot = await getDocs(collection(db, "time"));
    querySnapshot.forEach(Time => {
      const workingTime =
        currentTime.getTime() - Time.data().time.toDate().getTime();
      const workingTimeHours = Math.floor((workingTime / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const workingTimeMinutes = Math.floor((workingTime / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const workingTimeSeconds = Math.floor((workingTime / 1000) % 60)
        .toString()
        .padStart(2, "0");
      const workingHour = Math.floor(
        (workingTime / (1000 * 60 * 60)) % 24,
      ).toString();
      setWorkingHours(workingHour);
      setWorkOnTime(
        `${workingTimeHours}:${workingTimeMinutes}:${workingTimeSeconds}`,
      );
    });
  };
  // firestore에서 출근시간이 등록됬는지 체크
  const checkOnOff = async () => {
    const docRef = doc(db, "time", "workStartTime");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentTime: Date = new Date();
      getWorkingTime(currentTime);
      setWorkonoff(true);
    } else {
      // docSnap.data() will be undefined in this case
      setWorkonoff(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkOnOff();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <CommuteButton onClick={() => setModalOpen(true)} type="button">
        <WorkOnMark
          src={
            workonoff
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_Z2hn-5fYzTEf-40v3rW2LGO9Qma4FE5FA&usqp=CAU"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqtoS2rwPaT4aKpGPERdpEN1_rcfojGCNOrCjxOpWOA-HAmODktSNwOEXHHw_rHpQ-8is&usqp=CAU"
          }
        />
        <Span>{workonoff ? workOnTime : "commute"}</Span>
      </CommuteButton>
      {modalOpen && (
        <CommuteModal
          workonoff={workonoff}
          setWorkonoff={setWorkonoff}
          setModalOpen={setModalOpen}
          workingHours={workingHours}
        />
      )}
    </>
  );
};

export default CommuteButtonComponent;
