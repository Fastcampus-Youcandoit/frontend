import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  HomeCalendar,
  HomeCarousel,
  HomeGallery,
  HomeNotice,
} from "../components/home";

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
        <HomeCalendar />
      </HomeMainSection>
      <Footer />
    </HomeWrap>
  );
};

export default Home;
