import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { carouselImageData } from "../../constants/home/carouselImg";

const CrouselWrap = styled.div`
  z-index: 0;
  .carousel {
    img {
      height: 33vh;
    }

    .carousel .control-dots {
      width: 100%;
      bottom: 0.9rem;
      text-align: start;
      left: 4rem;
    }

    .carousel .control-dots .dot {
      width: 1rem;
      height: 1rem;
      background: #d2d2d2 0% 0% no-repeat padding-box;
      opacity: 1;
      box-shadow: none;
    }

    .carousel .control-dots .selected {
      width: 2.5rem;
      border-radius: 20px;
      background-color: #fff;
      transition: 0.2s;
    }

    p {
      display: none;
    }
  }
`;

const imgSlides = carouselImageData.map(image => (
  <div key={image.alt}>
    <img src={image.src} alt={image.alt} />
  </div>
));

const HomeCarousel = () => {
  return (
    <CrouselWrap>
      <Carousel
        className="carousel"
        showArrows={false}
        autoPlay
        infiniteLoop
        showThumbs={false}>
        {imgSlides}
      </Carousel>
    </CrouselWrap>
  );
};

export default HomeCarousel;
