import React, { Component, useState , createRef } from 'react';
import Select from 'react-select';
import CustomerCard from './customer-card.js';

const faceOptions = [];
const customer_profiles = [];
//let target = 0;
let counter = 0;

class FaceList extends Component {
    constructor(props){
        super(props);
        this.state = {
            target: 0
        }
        
    }

    handleChange = (e) => {
        for (var i=0; i < customer_profiles.length; i++) {
            if (customer_profiles[i].id === e.label) {
                this.setState({target: i})
            }
        }
        //console.log(this.state.target);
        
    }

    render(){
        const customer_id = this.props.label;
        const customer_url = this.props.faceIcon;
        const customer_ageClass = this.props.ageClass;
        const opt = {value: this.props.value, label: customer_id};
        const profile = {id: customer_id, type: customer_ageClass, pic: customer_url};
        // for (var i=0; i < faceOptions.length; i++) {
        //     let track = -1;
        //     if (faceOptions[i].value != opt.value) {
        //         track++;
        //     }
        //     if (track == i){
        //         faceOptions.push(opt)
        //     }
        // }
        faceOptions.push(opt);
        customer_profiles.push(profile);
        faceOptions.forEach(fo => {console.log(fo)});
        return (
            <>
                <Select options={faceOptions} onChange={this.handleChange.bind(this)}/>
                <CustomerCard ID={customer_profiles[this.state.target].id} TYPE={customer_profiles[this.state.target].type} URL={customer_profiles[this.state.target].url} />
            </>
        )
    }
}

export default FaceList;