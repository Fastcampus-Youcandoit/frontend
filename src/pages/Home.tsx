import styled from "styled-components";
import Footer from "../components/common/Footer";
import {
  HomeCalendar,
  HomeCarousel,
  HomeGallery,
  HomeNotice,
} from "../components/home";
import Header from "../components/common/Header";

const HomeWrap = styled.main`
  width: 100%;
`;

const HomeMainSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem 4rem;
`;

const SectionItemBox = styled.div`
  display: flex;
  gap: 2rem;
  transition: all 0.5s;

  @media (max-width: 1024px) {
    width: 100%;
    flex-wrap: wrap;
    transition: all 0.5s;
  }
`;

const HomeCalendarBox = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const FooterBox = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileFooterBox = styled.div`
  @media (max-width: 1024px) {
    height: 2rem;
  }
`;

const Home = () => {
  return (
    <HomeWrap>
      <Header />
      <section>
        <HomeCarousel />
      </section>
      <HomeMainSection>
        <SectionItemBox>
          <HomeNotice />
          <HomeGallery />
        </SectionItemBox>
        <HomeCalendarBox>
          <HomeCalendar />
        </HomeCalendarBox>
      </HomeMainSection>
      <FooterBox>
        <Footer />
      </FooterBox>
      <MobileFooterBox />
    </HomeWrap>
  );
};

export default Home;
