import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import NFS from "../../images/NFS.jpg";
import Fortnite from "../../images/Fortnite.jpg";
import Valorant from "../../images/Valorant.jpg";

const SlideShow = () => {
    return (
        <Carousel>
            <Carousel.Item >
                {/* <img src={Valorant} alt="First slide" className="d-block w-100 slideshow-images" /> */}
                <div className="slideshow-images" style={{ backgroundImage: `url(${Fortnite})` }} />
                <Carousel.Caption className="slidshow-content" >
                    <h3 className="d-block">Tournament Variety</h3>
                    <p className="d-block">Explore a diverse range of esports tournaments, from popular titles to niche games. Our platform offers a wide selection of gaming competitions, ensuring there's something for every gamer's taste.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                {/* <img src={NFS} alt="Second slide" className="d-block w-100 slideshow-images" /> */}
                <div className="slideshow-images" style={{ backgroundImage: `url(${NFS})` }} />
                <Carousel.Caption className="slidshow-content" >
                    <h3 className="d-block">Professional Competitions</h3>
                    <p className="d-block">Immerse yourself in high-stakes gaming with our professionally organized tournaments. Compete against top players, experience cutting-edge production quality, and witness thrilling matches that showcase the best of competitive esports.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                {/* <img src={Fortnite} alt="Third slide" className="d-block w-100 slideshow-images" /> */}
                <div className="slideshow-images" style={{ backgroundImage: `url(${Valorant})` }} />
                <Carousel.Caption className="slidshow-content" >
                    <h3 className="d-block">Community Engagement</h3>
                    <p className="d-block">Join a vibrant gaming community that extends beyond the tournaments. Participate in forums, connect with fellow gamers, and stay updated on the latest industry news. Our platform fosters a sense of community, bringing together esports enthusiasts from around the globe.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default SlideShow;