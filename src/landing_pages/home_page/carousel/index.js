import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../style.css"

class HomeCarousel extends Component {
    render() {

        // const carousel_data = [
        //     {
        //         image:'https://images.unsplash.com/photo-1592488874899-35c8ed86d2e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        //         title:'Apply the most advanced technology in POS system',
        //         paragraph:''
        //     }
        // ]

        return (
            <Carousel autoPlay showThumbs={false} showStatus={false} useKeyboardArrows className="landing-carousel presentation-mode">
                <div className="carousel landing-carousel ">
                    <img className="carousel-image" src="https://www.lithospos.com/storage/app/media/backery-pos-banner.jpg" />
                    <div className="carousel-content">
                        <h1>Apply the most advanced technology in POS system</h1>
                        <p>Designed by an advanced team of computer scientists</p>
                        {/* <button className="landing-carousel-button"><a href="#" style={{pointer:'cursor', color: 'white'}}>Explore Now  <span>&rarr;</span></a></button> */}
                    </div>
                </div>
               
            </Carousel>
        );
    }
};

export default HomeCarousel;