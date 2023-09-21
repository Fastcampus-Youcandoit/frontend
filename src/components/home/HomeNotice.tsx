import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";
import { NoticeType } from "../../types/home";

const SectionContainer = styled.section`
  width: 50%;
  height: 20rem;
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  height: 10%;
  justify-content: space-between;
  border-bottom: 1.2px solid #d2d2d2;
  font-family: "SUITE-Bold";
  padding-bottom: 0.5rem;
`;

const SectionHeaderTitle = styled.div`
  font-size: 1.2rem;
`;

const SectionButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const SectionButton = styled.button`
  border-radius: 5px;
  border: none;
  height: rem;
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
  height: 20%;
  border-bottom: 1px solid #d2d2d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "NotoSansKR-Medium";
  padding: 0 0.3rem;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  height: 100%;
  color: #000;
`;

const HomeNotice = () => {
  const [notices, setNotices] = useState<NoticeType[] | null>(null);

  const q = query(collection(db, "notice"), limit(5));
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
        <SectionHeaderTitle>공지사항</SectionHeaderTitle>
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
                  <div>{notice.title}</div>
                  <div>{notice.author}</div>
                </ContentItem>
              </StyledLink>
            ))}
        </ContentItemsBox>
      </ContentsBox>
    </SectionContainer>
  );
};

export default HomeNotice;
