import React from 'react'
import Navbar from "../header/Navbar";
import Footer from '../footer/index';
import Grid from '@material-ui/core/Grid';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from './saad.JPG'
import img2 from './ershad.jpeg'

function AboutUs(){
    return(
        <div>
            <Navbar/>
            <div className="about-story">
                <Grid container spacing={5}>
                    <Grid item md={12} sm={12} xs={12}>
                        <h2>OUR STORY</h2>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Grid className="icon-container" container spacing={5}>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1000+</h2>
                                <p> Working Hours</p>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>3</h2>
                                <p> Members</p>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1</h2>
                                <p> City</p>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12}>
                                <FontAwesomeIcon icon={faPodcast } className="story-icon"/>
                                <h2>1000+</h2>
                                <p> Likes</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <p>Our passion is to contribute to transforming the future retail, not only in our country but all over the world. We move towards the omnichannel model to integrate sales channels, ensure single database and management process for both online and offline environment. We apply cutting-edge technology (Face Detection and Recognition, Customer Analytics, Advanced Web technologies) to create an optimized retail environment that benefits both sellers and buyers at reasonable costs.
                        <p>Our product is the first product in the Pakistani market.The function of the intended system i.e ‘In-Store Video Analytics’ can be regarded as a new self-contained product. The system aims to provide a versatile dashboard that can be used to efficiently create customer profiles and display performance reports for the business considering customer activity and satisfaction.  
                        The system is a specialized product having its own POS system along with the face recognition model. Along with providing the details of the users, this system also focuses to provide the details of the products like sales data, and comparison among the sales for different years for better data visualization. The main focus of this system is to provide the retail owners the ability to store and analyze
                        customer data and their purchase patterns so that they may focus more on the consumer demands, which might ultimately lead to increased sales, and hence an increased profit margin.</p>
                        </p>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <h2 className="team-header">Meet the Team</h2>
                <Carousel className="story-carousel" autoPlay presentationMode interval="3000" infiniteLoop centerSlidePercentage={55} showThumbs={false} showStatus={false} useKeyboardArrows style={{width:'60%', backgroundColor:'white'}}>
                    <div className="team-carousel" >
                        <div className="team-content">
                            <img src="https://i1.rgstatic.net/ii/profile.image/912544164216833-1594578891532_Q512/Osama-Akhlaq.jpg" style={{width:'50%', height:'auto'}}/>
                            <h2>Osama Akhlaq</h2>
                            <p>Front end developer</p>
                        </div>
                    </div>
                    <div className="team-carousel" >
                        <div className="team-content">
                            <img src={img1} style={{width:'50%', height:'25%'}}/>
                            <h2>Saad Tariq</h2>
                            <p>Back end developer</p>
                        </div>
                    </div>
                    <div className="team-carousel">
                        <div className="team-content">
                            <img src={img2} style={{width:'50%', height:'50%'}}/>
                            <h2>Ershad Hussain</h2>
                            <p>Data Collection, Pre-processing, Database Management</p>
                        </div>
                    </div>

                </Carousel>
            </div>
            <Footer/>
        </div>
    )
}

export default AboutUs;