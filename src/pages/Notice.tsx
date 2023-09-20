import React, { useState } from "react";
import styled from "styled-components";
import writeIcon from "../assets/icons/wiki_icon/wiki_write_icon.png";
import Footer from "../components/common/Footer";

const NoticeBox = styled.div`
  width: 100vw;
  max-height: 80vh;
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
`;

const NoticeListItem = styled.div<{ isClicked: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  flex-grow: 1;
  align-items: center;
  margin-top: ${({ isClicked }) => (isClicked ? "10px" : "0")};
  cursor: pointer;
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

const P = styled.p`
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  padding: 15px;
  margin: 8px 20px 8px 45px;
`;

const NoticeDetailStyle = styled.div<{ isExpanded: boolean }>`
  display: ${props => (props.isExpanded ? "block" : "none")};
`;

const NoticeListButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NoticeEditButton = styled.button`
  width: 60px;
  height: 35px;
  border: none;
  border-radius: 5px;
  color: #087ea4;
  background-color: #e6f7ff;
  margin-right: 10px;
  font-family: "NotoSansKR-Medium";
`;

const NoticeDeleteButton = styled.button`
  width: 60px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin: 0 20px 10px 0;
  color: #fff;
  background-color: #c62917;
  font-family: "NotoSansKR-Medium";
`;

interface NoticeDetailProps {
  notice: {
    id: number;
    title: string;
    author: string;
    date: string;
    content?: string;
  };
  isExpanded: boolean;
}

const NoticeDetail: React.FC<NoticeDetailProps> = ({ notice, isExpanded }) => {
  return (
    <NoticeDetailStyle isExpanded={isExpanded}>
      {notice.content && <P>{notice.content}</P>}
      <NoticeListButton>
        <NoticeEditButton>수정</NoticeEditButton>
        <NoticeDeleteButton>삭제</NoticeDeleteButton>
      </NoticeListButton>
    </NoticeDetailStyle>
  );
};

const Notice: React.FC = () => {
  const [expandedNoticeId, setExpandedNoticeId] = useState<number | null>(null);
  const [clickedListItemId, setClickedListItemId] = useState<number | null>(
    null,
  );

  const toggleNoticeExpansion = (id: number) => {
    if (expandedNoticeId === id) {
      setExpandedNoticeId(null);
    } else {
      setExpandedNoticeId(id);
      setClickedListItemId(id);
    }
  };

  const notices = [
    {
      id: 1,
      title: "삼성 강남과 함께하는 패캠 원데이 클래스!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 2,
      title: "이번주엔 누구나 1+1 쿠폰 100% 당첨!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 3,
      title: "하반기 공채 지원? 합격 비결은 공채 패키지!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 4,
      title: "백엔드 개발자라면? 핀테크 프로젝트는 못참지!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 5,
      title: "삼성 강남과 함께하는 패캠 원데이 클래스!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 6,
      title: "이번주엔 누구나 1+1 쿠폰 100% 당첨!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 7,
      title: "하반기 공채 지원? 합격 비결은 공채 패키지!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 8,
      title: "백엔드 개발자라면? 핀테크 프로젝트는 못참지!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 9,
      title: "삼성 강남과 함께하는 패캠 원데이 클래스!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
    {
      id: 10,
      title: "이번주엔 누구나 1+1 쿠폰 100% 당첨!",
      author: "장영민",
      date: "09/21 00:00",
      content: "선착순 무료! 지금 신청하기",
    },
  ];

  return (
    <>
      <NoticeBox>
        <NoticeHeader>
          <NoticeMainText>공지사항</NoticeMainText>
          <WriteIcon src={writeIcon} alt="공지사항 작성 전 작성 아이콘" />
        </NoticeHeader>
        <Hr />
        {notices.map((notice, i) => (
          <NoticeList key={notice.id}>
            <NoticeListItem
              onClick={() => toggleNoticeExpansion(notice.id)}
              isClicked={clickedListItemId === notice.id} // 클릭된 아이템에만 margin-top 스타일 적용
            >
              <NoticeLeft>
                <NoticeId>{i + 1}</NoticeId>
                <NoticeTitle>{notice.title}</NoticeTitle>
              </NoticeLeft>
              <NoticeRight>
                <span>{notice.author}</span>
                <span>{notice.date}</span>
              </NoticeRight>
            </NoticeListItem>
            <NoticeDetail
              notice={notice}
              isExpanded={expandedNoticeId === notice.id}
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
