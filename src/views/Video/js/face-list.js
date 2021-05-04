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
            //face: ""
            index:0
        }
        
    }

    handleChange = (e) => {
        for (var i=0; i < customer_profiles.length; i++) {
            if (customer_profiles[i].id === e.label) {
                console.log("Checking Array: ",customer_profiles[i].pic)
                this.setState({
                    target: i,
                    //face: customer_profiles[i].pic
                })
            }
        }
        //console.log(customer_profiles[this.state.target]);
        
    }

    handleDelete = indexx => {
        faceOptions.splice(indexx,1);
        customer_profiles.splice(indexx,1);
      };

    UNSAFE_componentWillMount(){
        const customer_id = this.props.label;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const opt = {value: this.props.value, label: customer_id};
        const profile = {id: customer_id, type: customer_ageClass, pic: customer_url};
        faceOptions.push(opt);
        customer_profiles.push(profile);
    }
    componentDidUpdate(){
        // const customer_url = this.props.faceIcon;
        // console.log("URL in CDM: ", customer_url);
        let a = 0;
        let track = -1;
        const customer_id = this.props.label;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const opt = {value: this.props.value, label: customer_id};
        const profile = {id: customer_id, type: customer_ageClass, pic: customer_url};
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
        count++;
        // const customer_id = this.props.label;
        // const customer_url = this.props.faceIcon;
        // const customer_ageClass = this.props.ageClass;
        // const opt = {value: this.props.value, label: customer_id};
        // const profile = {id: customer_id, type: customer_ageClass, pic: customer_url};
        // let track = -1;
        // //console.log(customer_url);
        // let a = 0;
        // if (count == 1){
        //     faceOptions.push(opt);
        //     customer_profiles.push(profile);
        // }
        // else{
        //     for (var i=0; i < faceOptions.length; i++) {
        //         if (faceOptions[i].label != opt.label) {
        //             track++;
        //         }
        //         a=i;
        //     }
        //     if (track == a){
        //         faceOptions.push(opt);
        //         customer_profiles.push(profile);
        //     }
        // }
        console.log("render count", count);
        
        return (
            <>
                <Select options={faceOptions} onChange={this.handleChange.bind(this)}/>
                <CustomerCard ID={customer_profiles[this.state.target].id} TYPE={customer_profiles[this.state.target].type} URL={customer_profiles[this.state.target].pic } onDelete={this.handleDelete[this.props.value]} />
            </>
        )
    }
}

export default FaceList;