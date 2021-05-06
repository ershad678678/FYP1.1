import React, { Component, useState , createRef } from 'react';
import Select from 'react-select';
import CustomerCard from './customer-card.js';

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
                })
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

    UNSAFE_componentWillMount(){
        const customer_id = this.props.name;
        const customer_desc = this.props.desc;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const customer_gender = this.props.gender;
        const customer_expr = this.props.expression;
        const opt = {value: this.props.value, label: customer_id};
        const profile = {
            id: customer_id, 
            desc: customer_desc, 
            url: customer_url,
            age: customer_ageClass,
            gender: customer_gender,
            expression: customer_expr 
        };
        faceOptions.push(opt);
        customer_profiles.push(profile);
    }
    componentDidUpdate(){
        // const customer_url = this.props.faceIcon;
        // console.log("URL in CDM: ", customer_url);
        let a = 0;
        let track = -1;
        const customer_id = this.props.name;
        const customer_desc = this.props.desc;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const customer_gender = this.props.gender;
        const customer_expr = this.props.expression;
        const opt = {value: this.props.value, label: customer_id};
        const profile = {
            id: customer_id, 
            desc: customer_desc, 
            url: customer_url,
            age: customer_ageClass,
            gender: customer_gender,
            expression: customer_expr 
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
                    ID={customer_profiles[this.state.target].id} 
                    DESC={customer_profiles[this.state.target].desc}
                    URL={customer_profiles[this.state.target].url }
                    AGE={customer_profiles[this.state.target].age} 
                    GENDER={customer_profiles[this.state.target].gender}
                    EXPRESSION={customer_profiles[this.state.target].expression}
                    parentCallback = {this.handleCallback} 
                    purchase = {this.props.purchase}
                />
            </>
        )
    }
}

export default FaceList;
