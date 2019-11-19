import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row,
  Col
} from 'reactstrap';

import apiCall from "../components/apiCall"


const LoginCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [monstersList, setMonstersList] = useState([])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === monstersList.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? monstersList.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  useEffect(() => {
    apiCall.get('/item/gogetit')
    .then(res => {
      const monsters = res.data
      setMonstersList(monsters)
      
    }
    )
  },[] )


  const slides = monstersList.map((monster) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={monster.id}
      >
        <img src={monster.picture} alt={monster.name} width={"100%"}/>
        <CarouselCaption className="text-dark bg-light" captionText={monster.description} captionHeader={monster.name} />
      </CarouselItem>
    );
  });

  return (
    <Container >
      <Row className="justify-content-center">
        <Col className="justify-content-center" xs={8} md={4} xl={4}>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={"1500"}
            ride={"carousel"}
          >
            <CarouselIndicators items={monstersList} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl disabled direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl disabled direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginCarousel;