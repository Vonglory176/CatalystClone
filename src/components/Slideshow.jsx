import { Carousel } from "react-bootstrap";
import SlideshowImg1 from "../assets/slideshow/Rotating_Banner_-_BT_2_of_6_Templar_900x.webp"
import SlideshowImg2 from "../assets/slideshow/Rotating-Banner---SR-3-of-6-UrbanBrawl_1296x.webp"

export default function Slideshow() {
    return (
    <Carousel controls={false} indicators={false} keyboard={false} touch={false}>
      <Carousel.Item>
        <img src={SlideshowImg1}/>
      </Carousel.Item>

      <Carousel.Item>
        <img src={SlideshowImg2}/>
      </Carousel.Item>
    </Carousel>
    )
}