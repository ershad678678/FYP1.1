import React, { Component } from "react";
import { makeStyles , withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

let source = [];
class Customer_Card extends Component{
  constructor(props){
    super(props);
  }
  handleDelete = () => {
    this.props.parentCallback(this.props.ID);
  }

  saveCustomer = () => {
    let entry = {
      name: this.props.ID,
      descriptor: this.props.DESC,
      url: this.props.URL,
      age: this.props.AGE,
      gender: this.props.GENDER,
      expr: this.props.EXPRESSION
    }
    axios.post('http://localhost:10000/customer/add', entry)
          .then(res => console.log(res.data));
    this.savePurchase();
  }

  savePurchase = () => {
    let entry = {
      id: this.props.ID,
      purchase: this.props.purchase
    }
    axios.post('http://localhost:10000/purchases/add', entry)
          .then(res => console.log(res.data));
  }

  componentDidUpdate(){
   console.log(this.props.purchase);
  }

  render(){
    //const classes = useStyles();
    //console.log("IMG: ",this.props.URL);
    const p_history = [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ];
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
      {/* <img src={source[this.props.ID]}></img> */}
      <CardMedia
        className={classes.media}
        image={this.props.URL}
        title="Contemplative Reptile"
      >
       </CardMedia>
      <CardContent>
        <Grid className={classes.details} container spacing={1}>
          <Grid className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Customer ID:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.ID}
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Customer Type:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.TYPE}
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Total Visits:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              4
              {/* {props.visits} */}
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Average Spending:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              Rs 500
              {/* {props.average_spending} */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Total Spending:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Rs 2000
            {/* {props.total_spending} */}
            </Typography>
          </Grid>
        </Grid>

        <Typography  color="textSecondary" variant="p" style={{marginLeft:'5px'}}>
          Purchase History:
        </Typography>
        <div style={{ display: "flex", marginBottom:'20px' }}>
          {p_history.map((value) => (
            <CardMedia
              className={classes.history_images}
              image={value}
              title="History"
            />
          ))}
        </div>

        <Typography  color="textSecondary" variant="p" style={{marginLeft:'5px'}}>
          Customer might be interested in
        </Typography>
        <div style={{ display: "flex" }}>
          {p_history.map((value) => (
            <CardMedia
              className={classes.history_images}
              image={value}
              title="History"
            />
          ))}
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={this.handleDelete}
        >
          Delete
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.saveCustomer}
      >
        Proceed
      </Button>
      </CardContent>
    </Card>
    )
  }
}

const useStyles = theme => ({
    root: {
      maxWidth: 345,
      margin: "30px auto",
      padding:'10px 20px',
      backgroundColor: "#e0d6d6",
    },
    media: {
      height: 70,
      width: 70,
      margin: '20px 0px 20px 20px',
      borderRadius: "5px",
    },
    history_images: {
      height: 60,
      width: 60,
      margin: "5px",
      borderRadius: "5px",
    },
    details:{
        margin: '0px 0px 30px 0px',
    },
    line:{
        borderBottom: '1px solid grey',
    }
  });

  export default withStyles(useStyles, { withTheme: true })(Customer_Card);
  
