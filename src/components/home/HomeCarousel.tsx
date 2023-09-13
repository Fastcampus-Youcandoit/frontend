import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(0);

  function handleChange(index: number) {
    setCurrentIndex(index);
  }
  return (
    <div className="carousel">
      <Carousel>{}</Carousel>
    </div>
  );
};

export default Carousel;
