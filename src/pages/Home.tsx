import styled from "styled-components";
import HomeCarousel from "../components/home/HomeCarousel";

const HomeWrap = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
`;

const Home = () => {
  return (
    <HomeWrap>
      <HomeCarousel />
    </HomeWrap>
  );
};

export default Home;
