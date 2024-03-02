import { Carousel } from "react-bootstrap";

import templarImg1 from "../assets/slideshow/Rotating_Banner_Templar_540x.avif"
import templarImg2 from "../assets/slideshow/Rotating_Banner_Templar_720x.webp"
import templarImg3 from "../assets/slideshow/Rotating_Banner_Templar_900x.webp"

import urbanBrawl1 from "../assets/slideshow/Rotating-Banner_UrbanBrawl_1296x.webp"
import urbanBrawl2 from "../assets/slideshow/Rotating-Banner_UrbanBrawl_1512x.webp"

import ProgressiveImage from "react-progressive-image";
import placeholderImage from "../assets/slideshow/slidePlaceholder.jpg"
import { Link } from "react-router-dom";

export default function Slideshow() {
    return (
    <Carousel controls={false} indicators={false} keyboard={false} touch={false}>

      {/* TEMPLAR SLIDE */}
      <Carousel.Item>
        <Link to={"/collections/battletech"} title="View all Battletech products">
          <ProgressiveImage 
          src={templarImg1}
          srcSetData={{
            srcSet:`
            ${templarImg1} 540w, 
            ${templarImg2} 720w, 
            ${templarImg3} 900w`
          }}
          placeholder={placeholderImage}
          >
              {(src, loading, srcSetData) =>
                <img
                className={loading? "imgLoading":"imgLoaded"}
                src={src}
                srcSet={srcSetData.srcSet}
                alt={""}
                /> 
              }
          </ProgressiveImage>
        </Link>
      </Carousel.Item>

      {/* URBAN-BRAWL SLIDE */}
      <Carousel.Item>
        <Link to={"/collections/shadowrun"} title="View all Shadowrun products">        
          <ProgressiveImage 
          src={templarImg1}
          srcSetData={{
            srcSet:`
            ${urbanBrawl1} 1296w, 
            ${urbanBrawl2} 1512w`
          }}
          placeholder={placeholderImage}
          >
              {(src, loading, srcSetData) =>
                <img
                className={loading? "imgLoading":"imgLoaded"}
                src={src}
                srcSet={srcSetData.srcSet}
                alt={""}
                /> 
              }
          </ProgressiveImage>
        </Link>
      </Carousel.Item>
    </Carousel>
    )
}