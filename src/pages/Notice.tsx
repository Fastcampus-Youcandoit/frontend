import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import writeIcon from "../assets/icons/wiki_icon/wiki_write_icon.png";
import Footer from "../components/common/Footer";
import { db } from "../firebase";
import NoticeDetail from "../components/notice/NoticeDetail";

const NoticeBox = styled.div`
  width: 100vw;
  height: 80vh;
  padding: 25px 50px;
  overflow-y: scroll;
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const NoticeMainText = styled.span`
  font-size: 25px;
  font-family: "NotoSansKR-Bold";
`;

const WriteIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Hr = styled.hr`
  border: 1.5px solid #000;
  margin: 0;
`;

const NoticeList = styled.div`
  width: 100%;
  border-bottom: 1px solid #707070;
  cursor: pointer;
  min-height: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NoticeListItem = styled.div<{ isSelected: boolean }>`
  // Define the isSelected prop here
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  flex-grow: 1;
  align-items: center;
  cursor: pointer;
  transition: margin-top 0.5s ease-in-out;
  margin-top: ${props => (props.isSelected ? "10px" : "0")};
  transition: margin-top 0.7s ease;
`;

const NoticeLeft = styled.div`
  width: 400px;
  font-size: 18px;
  font-family: "NotoSansKR-Regular";
  display: flex;
  justify-content: flex-start;
`;

const NoticeRight = styled.div`
  width: 200px;
  font-family: "NotoSansKR-Light";
  font-size: 15px;
  display: flex;
  justify-content: space-evenly;
`;

const NoticeId = styled.span`
  margin-left: 10px;
`;

const NoticeTitle = styled.span`
  margin-left: 25px;
`;

interface NoticeDetailProps {
  id: string;
  title: string;
  date: string;
  content: string;
}

const Notice: React.FC = () => {
  const location = useLocation();
  const [notices, setNotices] = useState<NoticeDetailProps[]>([]);
  const [noticeId, setNoticeId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const noticesData: any[] = [];
      const querySnapshot = await getDocs(collection(db, "notice"));
      querySnapshot.forEach(doc => {
        noticesData.push({ id: doc.id, ...doc.data() });
      });

      setNotices(noticesData);
      if (location.state.noticeId) setNoticeId(location.state.noticeId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoticeClick = (id: string) => {
    setNoticeId(prevNoticeId => (prevNoticeId === id ? null : id));
  };

  useEffect(() => {
    fetchData();

    return () => setNoticeId(null);
  }, []);

  return (
    <>
      <NoticeBox>
        <NoticeHeader>
          <NoticeMainText>공지사항</NoticeMainText>
          <Link to="/notice/edit" state={{ id: null }}>
            <WriteIcon src={writeIcon} alt="공지사항 작성 전 작성 아이콘" />
          </Link>
        </NoticeHeader>
        <Hr />
        {notices.map((notice: NoticeDetailProps, i) => (
          <NoticeList key={notice.id}>
            <NoticeListItem
              onClick={() => handleNoticeClick(notice.id)}
              isSelected={noticeId === notice.id}>
              <NoticeLeft>
                <NoticeId>{i + 1}</NoticeId>
                <NoticeTitle>{notice.title}</NoticeTitle>
              </NoticeLeft>
              <NoticeRight>
                <span>{notice.date}</span>
              </NoticeRight>
            </NoticeListItem>
            <NoticeDetail
              noticeId={notice.id}
              content={notice.content}
              fetchData={fetchData}
              isSelected={noticeId === notice.id}
            />
          </NoticeList>
        ))}
        <Hr />
      </NoticeBox>
      <Footer />
    </>
  );
};

export default Notice;
