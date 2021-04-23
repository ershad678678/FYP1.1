import React, { Component, useState , createRef } from 'react';
import Select from 'react-select';

const faceOptions = []

class FaceList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const opt = {value: this.props.value, label: this.props.label}
        faceOptions.push(opt);
        return (
            <Select options={faceOptions} />
        )
    }
}

export default FaceList;