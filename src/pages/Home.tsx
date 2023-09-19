import styled from "styled-components";
import Footer from "../components/common/Footer";
import {
  HomeCalendar,
  HomeCarousel,
  HomeGallery,
  HomeNotice,
} from "../components/home";

const HomeWrap = styled.main`
  width: 100vw;
`;

const HomeMainSection = styled.section`
  width: 100%;
  padding: 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionItemBox = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
`;

const Home = () => {
  return (
    <HomeWrap>
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
