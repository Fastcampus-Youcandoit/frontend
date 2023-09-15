import styled from "styled-components";
import { HomeCalendar, HomeCarousel, HomeGallery } from "../components/home";

const HomeWrap = styled.main`
  width: 100%;
  height: 83vh;
`;

const HomeMainSection = styled.section`
  width: 100%;
  height: 43vh;
  display: flex;
  gap: 4rem;
  padding: 1.5rem 4rem;
`;

const HomeNoticeSection = styled.section`
  height: 7vh;
  padding: 0 4rem;
`;

const NoticeSectionContents = styled.div`
  border-top: 1.2px solid #d2d2d2;
  align-items: center;
  display: flex;
  height: 100%;
`;

const NoticeTitle = styled.h3`
  font-size: 0.8rem;
  font-family: "NotoSansKR-Bold";
`;

const Home = () => {
  return (
    <HomeWrap>
      <section>
        <HomeCarousel />
      </section>
      <HomeMainSection>
        <HomeGallery />
        <HomeCalendar />
      </HomeMainSection>
      <HomeNoticeSection>
        <NoticeSectionContents>
          <NoticeTitle>공지사항</NoticeTitle>
        </NoticeSectionContents>
      </HomeNoticeSection>
    </HomeWrap>
  );
};

export default Home;
