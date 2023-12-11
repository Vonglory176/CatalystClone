import { Carousel } from "react-bootstrap";
import SlideshowTestImg from "../assets/banner/Rotating_Banner_-_BT_2_of_6_Templar_540x.avif"

export default function Slideshow() {
    return (
    <Carousel controls={false} indicators={false} keyboard={false} touch={false}>
      <Carousel.Item>
        <img src={SlideshowTestImg}/>
      </Carousel.Item>

      <Carousel.Item>
        <img src={SlideshowTestImg}/>
      </Carousel.Item>

      <Carousel.Item>
        <img src={SlideshowTestImg}/>
      </Carousel.Item>
    </Carousel>
    )
}