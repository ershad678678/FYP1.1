import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save"
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

let source = [];
var sum = 0;
class Customer_Card extends Component {
  constructor(props) {
    super(props);
  }

  handleDelete = () => {
    this.props.parentCallback(this.props.ID);
    alert("Detection deleted!");
  };

  saveCustomer = () => {
    let custmr = {
      name: this.props.ID,
      descriptor: this.props.DESC,
      url: this.props.URL,
      age: this.props.AGE,
      gender: this.props.GENDER,
      expr: this.props.EXPRESSION,
      visit: this.props.VISIT,
      avg: 0,
      total: 0 
    };
    axios
      .post("http://localhost:10000/customer/add", custmr)
      .then((res) => console.log(res.data));
    this.savePurchase(this.props.ID);
    this.visit_info(this.props.ID);
    alert("Customer Profile added!");
    this.props.parentCallback(this.props.ID);
    this.props.reset(this.props.ID);
  };

  updateCustomer = () => {
    let query = this.props.ID;
    axios
      .put("http://localhost:10000/customer/incvisit/" + query)
      .then((res) => console.log(res.data));
    this.savePurchase(query);
    this.visit_info(query);
    alert("Customer Profile updated!");
    this.props.parentCallback(query);
    this.props.reset(query);
  };

  savePurchase = (query) => {
    //let query = this.props.ID;
    axios.get("http://localhost:10000/purchases/" + query).then((response) => {
      if (response.data == 0) {
        /* no purchase record exists - record first purchase */
        let buy = this.pushTransaction(this.props.purchase);
        let transaction = {
          id: query,
          purchase: buy,
        };
        axios
          .post("http://localhost:10000/purchases/add", transaction)
          .then((res) => {
            console.log(res.data);
          });
          let fwd = {
            purchaseTotal: sum,
            prevTotal: this.props.TOTSPEND,
            noOfVisits: this.props.VISIT
          }
          axios
              .put("http://localhost:10000/customer/spending/" + query, fwd)
              .then((res) => console.log(res));
          sum = 0;
          
      } else {
        let buy = this.updateTransaction(response.data);
        let transaction = {
          id: query,
          purchase: buy,
        };
        axios
          .put("http://localhost:10000/purchases/update/" + query, transaction)
          .then((res) => {
            console.log(res.data);
          });
          let fwd = {
            purchaseTotal: sum,
            prevTotal: this.props.TOTSPEND,
            noOfVisits: this.props.VISIT
          }
          console.log(fwd);
          axios
              .put("http://localhost:10000/customer/spending/" + query, fwd)
              .then((res) => console.log(res));
          sum = 0;
          
      }
    });
  };

  pushTransaction = (purch) => {
    let items = [];
    purch.forEach((p) => {
      let entry = {
        item: p.item_name,
        img: p.image_url,
        qty: p.checkoutqty,
        price: p.retail_price,
      };
      items.push(entry);
      this.expenditure(p.checkoutqty, p.retail_price);
    });
    return items;
  };

  updateTransaction = (data) => {
    let old_items = data[0].items;
    let new_purch = this.props.purchase;
    let temp = [];
    new_purch.forEach((np) => {
      let check = false;
      for (var i = 0; i < old_items.length; i++) {
        if (np.item_name == old_items[i].item) {
          old_items[i].qty += np.checkoutqty;
          check = true;
        }
      }
      if (check == false) {
        temp.push(np);
      }
    });
    let new_items = this.pushTransaction(temp);
    let updated_items = old_items.concat(new_items);
    return updated_items;
  };

  visit_info = (name) => {
    var dt = new Date();
    var date = dt.toLocaleDateString();
    var time = dt.toLocaleTimeString();
    let trnsc = this.pushTransaction(this.props.purchase);
    let entry = {
      name: name,
      gender: this.props.GENDER,
      expression: this.props.EXPRESSION,
      visitNo: this.props.VISIT,
      transaction: trnsc,
      dateToday: date,
      timeNow: time,
    };
    axios
      .post("http://localhost:10000/visits/add/", entry)
      .then((res) => console.log(res.data));
  };

  expenditure = (qty, price) => {
    let product = qty*price;
    sum += product; 
    console.log("SUM: ",sum);
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={this.props.URL}
          title="Contemplative Reptile"
        ></CardMedia>
        {this.props.MSG}
        <CardContent>
          <Grid className={classes.details} container spacing={1}>
            <Grid className={classes.line} item xs={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Customer Name:
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={3}>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.ID}
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Customer Age:
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={3}>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.AGE}
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Total Visits:
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={3}>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.VISIT}
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Average Spending:
              </Typography>
            </Grid>
            <Grid className={classes.line} item xs={3}>
              <Typography variant="body2" color="textSecondary" component="p">
                Rs {this.props.AVGSPEND}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Total Spending:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Rs {this.props.TOTSPEND}
              </Typography>
            </Grid>
          </Grid>
          {/* HERE LIES THE NAME */}
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
          <Typography
            color="textSecondary"
            variant="body2"
            style={{ marginLeft: "5px" }}
          >
            Purchase History:
          </Typography>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            {this.props.HIST.map(value => (
              <CardMedia
                className={classes.history_images}
                image={value}
                title="History"
              />
            ))}
          </div>
          <Typography  color="textSecondary" variant="body2" style={{marginLeft:'5px'}}>
          Customer might be interested in:
        </Typography>
        <div style={{ display: "flex" }}>
          {this.props.RECOMM.map((value) => (
            <CardMedia
              className={classes.history_images}
              image={value}
              title="Future"
            />
          ))}
        </div>
        <Typography  color="textSecondary" variant="body2" style={{marginLeft:'5px'}}>
          Similar to:
        </Typography>
        <div style={{ display: "flex" }}>
          {this.props.SIM.map((value) => (
             <Typography  color="textSecondary" variant="body2" style={{marginLeft:'5px'}}>
             {value}
           </Typography>
          ))}
        </div>
          <div className={classes.button_holder}>
            <Button
            style={{backgroundColor:'red'}}
              variant="contained"
              color="secondary"
              className={classes.button}
              // startIcon={<DeleteIcon />}
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
              // startIcon={<SaveIcon />}
              onClick={this.updateCustomer}
            >
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
    margin: "30px auto",
    padding: "10px 20px",
    backgroundColor: "#e0d6d6",
  },
  media: {
    height: 70,
    width: 70,
    margin: "20px 0px 20px 20px",
    borderRadius: "5px",
  },
  history_images: {
    height: 60,
    width: 60,
    margin: "5px",
    borderRadius: "5px",
  },
  details: {
    margin: "0px 0px 30px 0px",
  },
  line: {
    borderBottom: "1px solid grey",
  },
  button_holder: {
    display: "flex",
    justifyContent:'space-between'
  },
  button: {
    borderRadius: "30px",
    margin: '0px 5px',
    fontSize:'1.2rem', 
    padding: '7px 10px', 
    width:'120px'
  },
});

export default withStyles(useStyles, { withTheme: true })(Customer_Card);
