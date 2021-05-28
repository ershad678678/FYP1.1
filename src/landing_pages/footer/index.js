import React from "react";
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Footer(){
    return(
        <div className="footer-section">
            <Grid className="footer" container spacing={5}>
                <Grid item md={4} sm={4} xs={12}>
                    <h2 style={{textAlign: 'left'}}>About In-Store Video Analytics</h2>
                    <p>In-Store Video Analytics uses Face Detection and Recognition to assist local businesses in creating detailed profiles of their customer base, provide customer-specific products and perform customer behavior analysis on past purchasing patterns.</p>

                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    <p></p>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    <div style={{marginBottom:'5px', display:'flex'}}>
                            <FontAwesomeIcon icon={faMapMarker} className="iconfont" />
                            <p>Islamabad, Pakistan</p>
                        </div>
                        <div style={{marginBottom:'5px', display:'flex'}}>
                            <FontAwesomeIcon icon={faPhone} className="iconfont"/>
                            <p> (+92) 315 6632878</p>
                        </div>
                        <div style={{marginBottom:'5px', display:'flex'}}>
                            <FontAwesomeIcon icon={faEnvelope} className="iconfont"/>
                            <p><a href="#"> fyp@grizzlyTech.com</a></p>
                        </div>
                </Grid>
            </Grid>
        </div>

    )
}

export default Footer;