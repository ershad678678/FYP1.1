import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../style.css"
import Grid from '@material-ui/core/Grid';


class TestimonialCarousel extends Component {
    render() {
        return (
            <Carousel autoPlay showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode testimonial-section">
                <div className="testimonial-carousel">
                    <Grid container spacing={5}>
                        <Grid className="content-parent" item md={7} sm={7} xs={12}>
                            <div className="testimonial-content">
                                <h1>Hear our cutomer stories</h1>
                                <p>We implemented this state-of-the-art POS system in our bakery. Trust me it completely revolutionized my business. It is very simple to use and powerful. We have been able to vastly boost our sales and get detailed insight about our customer preferences. It's really worth the money.</p>
                                <h3>Modern Bakery, Aabpara</h3>
                            </div>
                        </Grid>
                        <Grid item md={5} sm={5} xs={12}>
                            <div className="testimonial-image-container">
                                <img className="testimonial-image" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/65bf3455998089.599c4bf97cba7.jpg" alt="img"/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {/* <div className="testimonial-carousel">

                </div>
                <div className="testimonial-carousel">

                </div> */}
            </Carousel>
        );
    }
};

export default TestimonialCarousel;