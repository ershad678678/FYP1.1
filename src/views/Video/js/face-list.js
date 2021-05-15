import React, { Component, useState , createRef } from 'react';
import Select from 'react-select';
import CustomerCard from './customer-card.js';
import axios from 'axios';

const faceOptions = [];
const customer_profiles = [];
//let target = 0;
let counter = 0;
let count=0;

class FaceList extends Component {
    constructor(props){
        super(props);
        this.state = {
            target: 0,
        }
        
    }

    handleChange = (e) => {
        for (var i=0; i < customer_profiles.length; i++) {
            if (customer_profiles[i].id === e.label) {
                //console.log("Checking Array: ",customer_profiles[i].pic)
                this.setState({
                    target: i,
                    //face: customer_profiles[i].pic
                });
                console.log(customer_profiles);
            }
        }
    }

    handleCallback = (indexx) => {
        let tg = 0;
        for (var i=0; i < customer_profiles.length; i++) {
            if (customer_profiles[i].id == indexx) {
                customer_profiles.splice(i,1);
                faceOptions.splice(i,1);
                tg = i;
            }
        }
        this.handleChange(faceOptions[tg]);
        // faceOptions.splice(indexx,1);
        // customer_profiles.splice(indexx,1);
    };

    flagReset = (inx) => {
        this.props.resetFlag(inx);
    }

    UNSAFE_componentWillMount(){
        let p_history = [];
        const customer_msg = this.props.message;
        const customer_id = this.props.name;
        const customer_desc = this.props.desc;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const customer_gender = this.props.gender;
        const customer_expr = this.props.expression;
        const customer_visit = this.props.visitCount;
        const opt = {value: this.props.value, label: customer_id};
        //console.log(opt);
        const profile = {
            status: customer_msg,
            id: customer_id, 
            desc: customer_desc, 
            url: customer_url,
            age: customer_ageClass,
            gender: customer_gender,
            expression: customer_expr,
            visit: customer_visit,
            history: p_history
        };
        faceOptions.push(opt);
        customer_profiles.push(profile);
    }
    componentDidUpdate(){
        // const customer_url = this.props.faceIcon;
        // console.log("URL in CDM: ", customer_url);
        let a = 0;
        let track = -1;
        let p_history = [];
        const customer_msg = this.props.message;
        const customer_id = this.props.name;
        const customer_desc = this.props.desc;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const customer_gender = this.props.gender;
        const customer_expr = this.props.expression;
        const customer_visit = this.props.visitCount;
        const opt = {value: this.props.value, label: customer_id};
        axios.get('http://localhost:10000/purchases/'+customer_id)
       .then(response => {
            if(response.data == 0){
                p_history = [];
            }
            else{
                response.data[0].items.forEach(element => {
                    p_history.push(element.img);
                });
            }   
       })
        //console.log(opt);
        const profile = {
            status: customer_msg,
            id: customer_id, 
            desc: customer_desc, 
            url: customer_url,
            age: customer_ageClass,
            gender: customer_gender,
            expression: customer_expr,
            visit: customer_visit,
            history: p_history
        };
        for (var i=0; i < faceOptions.length; i++) {
                if (faceOptions[i].label != opt.label) {
                    track++;
                }
                a=i;
        }
            if (track == a){
                faceOptions.push(opt);
                customer_profiles.push(profile);
            }
    }

    render(){
        return (
            <>
                <Select options={faceOptions} onChange={this.handleChange.bind(this)}/>
                <CustomerCard 
                    MSG={customer_profiles[this.state.target].status}
                    ID={customer_profiles[this.state.target].id} 
                    DESC={customer_profiles[this.state.target].desc}
                    URL={customer_profiles[this.state.target].url }
                    AGE={customer_profiles[this.state.target].age} 
                    GENDER={customer_profiles[this.state.target].gender}
                    EXPRESSION={customer_profiles[this.state.target].expression}
                    VISIT={customer_profiles[this.state.target].visit}
                    HIST={customer_profiles[this.state.target].history}
                    parentCallback = {this.handleCallback} 
                    purchase = {this.props.purchase}
                    reset={this.flagReset}
                />
            </>
        )
    }
}

export default FaceList;
