import React, { useState, useEffect, useRef } from "react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import CommuteModal from "./CommuteModal";
import { db } from "../../firebase";
import { Span, CommuteButton, WorkOnMark } from "./StyleComponentCommute";

const CommuteButtonComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [workonoff, setWorkonoff] = useState<boolean>(false);
  const [workOnTime, setWorkOnTime] = useState<string>("00:00:00");
  const [workingHours, setWorkingHours] = useState<string>("0");
  const workingTime = useRef(0);

  // 일한 시간을 설정합니다
  const getWorkingTime = async () => {
    console.log("getworkingTime");
    const querySnapshot = await getDocs(collection(db, "time"));
    querySnapshot.forEach(Time => {
      workingTime.current = Time.data().time.toDate().getTime();
    });
  };
  // 일한 시간을 시분초로 나타냅니다.
  const setWorkingTime = (currentTime: Date) => {
    const time = currentTime.getTime() - workingTime.current;
    const workingTimeHours = Math.floor((time / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, "0");
    const workingTimeMinutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const workingTimeSeconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const workingHour = Math.floor((time / (1000 * 60 * 60)) % 24).toString();
    setWorkingHours(workingHour);
    setWorkOnTime(
      `${workingTimeHours}:${workingTimeMinutes}:${workingTimeSeconds}`,
    );
  };
  // firestore에 data유무를 확인합니다
  const checkOnOff = async () => {
    const docRef = doc(db, "time", "workStartTime");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("checkOn");
      setWorkonoff(true);
    } else {
      // console.log("checkOff");
      setWorkonoff(false);
    }
  };

  useEffect(() => {
    getWorkingTime();
    checkOnOff();
  }, [workonoff]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (workonoff) {
      // Check if workonoff is true before executing the effect
      const timer = setInterval(() => {
        const currentTime = new Date();
        setWorkingTime(currentTime);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [workonoff]);

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
        <Span className="commute_span">
          {workonoff ? workOnTime : "commute"}
        </Span>
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
