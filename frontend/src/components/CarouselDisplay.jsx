import React from 'react';
import Carousel from 'react-elastic-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarCard from './CarCard';
import products from '../test.js';

function CarouselDisplay(props) {
  console.log(props.vehicle);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  if (!props.vehicle) {
    return <div>Loading...</div>; 
  }

  return (
    <>
  {props.vehicle && props.vehicle.length > 0 ? (
    <Carousel breakPoints={breakPoints}>
      {props.vehicle.map((value) => (
        <CarCard
          key={value.name}
          name={value.name}
          model={value.model}
          type={value.vehicle_type == "Car" ? value.type :
                value.vehicle_type  == "Truck" ? value.tonnage :
                value.vehicle_type  == "Motorcycle" ? value.cc :
                value.vehicle_type  == "Boat" ? value.knots :
                value.tbo
          }
          price={value.price}
        />
      ))}
    </Carousel>
  ) : <p class="pb-16 text-white" > No postings</p>}
</>
  );
}

export default CarouselDisplay;
