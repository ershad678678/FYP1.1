import React from "react";
import Navbar from "../header/Navbar";
import HomeCarousel from './carousel/index'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TestimonialCarousel from './testimonial_carousel/index'
import Footer from '../footer/index'

function HomeComponent(){
    return(
        <div>
            <Navbar/>
            <HomeCarousel/>
            <div className="push-section">
                <Grid container spacing={5}>
                    <Grid item md={12} sm={12} xs={12}>
                        <h1>Push beyond all limits </h1>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12} className="push-cards">
                        <div>
                            <img className="push-image" src= "https://www.connectpos.com/wp-content/themes/connectSpos/images/home/img_payment.png"/>
                            <h3>Support Multiple Payment Methods</h3>
                            <p>Support up to 20 payment methods, from cash to cards, and create custom payment options.</p>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12} className="push-cards">
                    <div>
                            <img className="push-image" src= "https://www.connectpos.com/wp-content/themes/connectSpos/images/home/img_hardware.png"/>
                            <h3>Support Multiple Payment Methods</h3>
                            <p>Support up to 20 payment methods, from cash to cards, and create custom payment options.</p>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12} className="push-cards">
                        <div>
                            <img className="push-image" src= "https://www.connectpos.com/wp-content/themes/connectSpos/images/home/img_support.png"/>
                            <h3>Support Multiple Payment Methods</h3>
                            <p>Support up to 20 payment methods, from cash to cards, and create custom payment options.</p>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12} className="push-cards">
                    <div>
                            <img className="push-image" src= "https://www.connectpos.com/wp-content/themes/connectSpos/images/home/img_solution.png"/>
                            <h3>Support Multiple Payment Methods</h3>
                            <p>Support up to 20 payment methods, from cash to cards, and create custom payment options.</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="retail-section">
                <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12}>
                        <h2>Whoever you are, We fit multiple retail industries</h2>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <div className="retail-cards">
                            <img src="https://www.connectpos.com/wp-content/themes/connectSpos/images/home/img_fashion.png"/>
                            <h3>Fashion And Accessories</h3>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <div className="retail-cards">
                            <img src="https://static-01.daraz.pk/p/257b5d0a434129f3153ae04a44f86657.jpg"/>
                            <h3>Furniture and Decor</h3>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <div className="retail-cards">
                            <img src="https://media.istockphoto.com/photos/home-appliance-in-the-store-picture-id515443264?k=6&m=515443264&s=612x612&w=0&h=QgzJ5Wq44l5_A-4J1pRm6HJ-3R6Y4d0SxQuNfBdiw4Y="/>
                            <h3>Electronics and Appliances</h3>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <div className="retail-cards">
                            <img src="https://s3.envato.com/files/115803106/Preview%20Images/View_03.jpg"/>
                            <h3>Clothing and Branding</h3>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <TestimonialCarousel/>
            <Footer/>
        </div>
    )
}

export default HomeComponent;