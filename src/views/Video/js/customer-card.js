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
import TextField from '@material-ui/core/TextField';
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
    let custmr = {
      name: this.props.ID,
      descriptor: this.props.DESC,
      url: this.props.URL,
      age: this.props.AGE,
      gender: this.props.GENDER,
      expr: this.props.EXPRESSION,
      visit: this.props.VISIT
    }
    axios.post('http://localhost:10000/customer/add', custmr)
         .then(res => console.log(res.data));
    //this.savePurchase();
  }

  updateCustomer = () => {
    let query = this.props.ID;
    axios.put('http://localhost:10000/customer/incvisit/'+query)
         .then(res => console.log(res.data));
    this.props.parentCallback(query);
    this.props.reset(query);
  }

  savePurchase = () => {
  let query = this.props.ID;
  axios.get('http://localhost:10000/purchases/'+query)
       .then(response => {
          if(response.data == 0){
            // means first ever transaction of customer
            let buy = this.pushTransaction(this.props.purchase);
            console.log("IF EXECUTED");
            let transaction = {
            id: this.props.ID,
            purchase: buy
          }
            axios.post('http://localhost:10000/purchases/add', transaction)
                .then(res => console.log(res.data));
          }
          else{
          console.log("ELSE EXECUTED")
          let buy = this.updateTransaction(response.data);
          let transaction = {
          id: this.props.ID,
          purchase: buy
          }
          axios.put('http://localhost:10000/purchases/update/'+query, transaction)
               .then(res => console.log(res.data));
          }
       })//.catch(console.log("Error"))
  }

  pushTransaction = (purch) => {
    //let purch = this.props.purchase;
    let items = [];
    purch.forEach(p => {
      //console.log(p.item_name,p.image_url,p.checkoutqty,p.retail_price);
      let entry = {
        item: p.item_name,
        img: p.image_url,
        qty: p.checkoutqty,
        price: p.retail_price
      };
      items.push(entry);
    });
    return items;
  }

  updateTransaction = (data) => {
    let old_items = data[0].items;
    //console.log("Old Items: ",old_items);
    let new_items = this.pushTransaction(this.props.purchase);
    //console.log("New Items: ",new_items);
    let updated_items = old_items.concat(new_items);
    console.log("Merged Items: ",updated_items);
    return updated_items;
  }

  componentDidUpdate(){
  //  let prch = this.props.purchase;
  //  prch.forEach(p => {
  //    console.log(p.item_name,p.image_url,p.checkoutqty,p.retail_price);
  //  })
  //console.log(this.props.purchase);
  }

  render(){
    const p_history = [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ];
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={this.props.URL}
        title="Contemplative Reptile">
      </CardMedia>
      {this.props.MSG}
      <CardContent>
        <Grid className={classes.details} container spacing={1}>
          {/* <Grid className={classes.line} item xs={6}>
            <Typography variant="body2" color="textPrimary" component="p">
              {this.props.MSG}
            </Typography>
          </Grid> */}
          <Grid className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Customer Name:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.ID}
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Customer Age:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.AGE}
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              Total Visits:
            </Typography>
          </Grid>
          <Grid  className={classes.line} item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.VISIT}
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
        {/* HERE LIES THE NAME */}
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
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
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.updateCustomer}
      >
        Update
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
  
