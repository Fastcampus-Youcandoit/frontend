import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import commuteIcon from "../../assets/icons/header_icon/header_commute_black_icon.png";
import { db } from "../../firebase";
import { IconImg } from "../common/Header";
import CommuteModal from "./CommuteModal";
import { CommuteButton, Span, WorkOnMark } from "./StyleComponentCommute";

const CommuteButtonComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [workonoff, setWorkonoff] = useState<boolean>(false);
  const [workOnTime, setWorkOnTime] = useState<string>("00:00:00");
  const [workingHours, setWorkingHours] = useState<string>("0");
  const workingTime = useRef(0);
  const auth = getAuth();

  // 일한 시간을 설정합니다
  const getWorkingTime = () => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, "time", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { 출근시간 } = docSnap.data();
          workingTime.current = 출근시간.toDate().getTime(); // 출근시간 필드의 값을 가져옵니다.
        }
      }
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
    onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, "time", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWorkonoff(true);
        } else {
          setWorkonoff(false);
        }
      }
    });
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
        <IconImg src={commuteIcon} alt="commute icon" />
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
