import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";
import { NoticeType } from "../../types/home";

const SectionContainer = styled.section`
  width: 50%;
  height: calc(width / 16 * 9);
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  @media (max-width: 1024px) {
    width: 100%;
    transition: all 0.5s;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  height: 10%;
  justify-content: space-between;
  border-bottom: 1.2px solid #d2d2d2;
  font-family: "NotoSansKR-Medium";
  padding-bottom: 1rem;
`;

const SectionHeaderBox = styled.div`
  display: flex;
  align-items: center;
`;

const SectionHeaderTitle = styled.span`
  font-size: 1.2rem;
`;

const SectionButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const SectionButton = styled.button`
  height: 100%;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: "NotoSansKR-Medium";
`;

const ContentsBox = styled.div`
  height: 90%;
`;

const ContentItemsBox = styled.ul`
  height: 100%;
`;

const ContentItem = styled.li`
  width: 100%;
  height: 4.5rem;
  border-bottom: 1px solid #d2d2d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "NotoSansKR-Medium";
  padding: 0 1rem 0 0;
  cursor: pointer;
  transition: all 0.5s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 1919px) {
    height: 5.5rem;
    transition: all 0.5s;
  }

  @media (min-width: 1600px) {
    height: 5rem;
    transition: all 0.5s;
  }

  @media (max-width: 1440px) {
    font-size: 0.9rem;
  }

  @media (max-width: 1300px) {
    font-size: 0.8rem;
  }
`;

const NoticeTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeAuthor = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledLink = styled(Link)`
  height: 100%;
  color: #000;
`;

const HomeNotice = () => {
  const [notices, setNotices] = useState<NoticeType[] | null>(null);

  const q = query(collection(db, "notice"), limit(6));
  const fetchData = async () => {
    const noticesData: any[] = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(notice => {
        noticesData.push({ id: notice.id, ...notice.data() });
      });

      setNotices(noticesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionHeaderBox>
          <SectionHeaderTitle>공지사항</SectionHeaderTitle>
        </SectionHeaderBox>
        <SectionButtonBox>
          <StyledLink to="/notice" state={{ noticeId: null }}>
            <SectionButton type="button">전체보기</SectionButton>
          </StyledLink>
        </SectionButtonBox>
      </SectionHeader>
      <ContentsBox>
        <ContentItemsBox>
          {notices &&
            notices.map(notice => (
              <StyledLink
                to="notice"
                key={notice.id}
                state={{ noticeId: notice.id }}>
                <ContentItem>
                  <NoticeTitle>{notice.title}</NoticeTitle>
                  <NoticeAuthor>{notice.author}</NoticeAuthor>
                </ContentItem>
              </StyledLink>
            ))}
        </ContentItemsBox>
      </ContentsBox>
    </SectionContainer>
  );
};

export default HomeNotice;
