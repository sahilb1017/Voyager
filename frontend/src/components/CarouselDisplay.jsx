import Carousel from "react-elastic-carousel";
import "react-multi-carousel/lib/styles.css";
import CarCard from "./CarCard";

function CarouselDisplay() {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <>
        <Carousel breakPoints={breakPoints}>
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
        </Carousel>
    </>
    
  )
}

export default CarouselDisplay
