import * as faceapi from "face-api.js";
import "../css/styles.css";
import React, { Component, useState, createRef } from "react";
import Select from "react-select";
import axios from "axios";
import demo from "../demo.mp4";
import { idText } from "typescript";
import FaceList from "./face-list.js";
import { Grid } from "@material-ui/core";

const detectedFaces = [];
const labeledDescriptors = [];
const customer_info = [];
let predictedAges = [];
let id = 0;
var lfd;

class FaceModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      name: "",
      descriptor: {},
      url: "",
      age: "",
      gender: "",
      expr: "",
      visit: 0,
      avg_spend: 0,
      tot_spend: 0,
      val: 0,
    };
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]).then(console.log("loading."));

    //this.video = createRef();
    //this.myCanvas = createRef();

    this.assignLabel = this.assignLabel.bind(this);
    this.drawCanvas = this.drawCanvas.bind(this);
    this.drawFace = this.drawFace.bind(this);
    this.interpolateAgePredictions = this.interpolateAgePredictions.bind(this);
  }

  // componentDidMount(){
  //     this.getOptions();
  // }

  faceDetection = () => {
    this.extractFaceFromDB();
    const maxThreshold = 0.6;
    let counter = 0;
    var facematcher;
    //this.id.current = 1;
    const video = document.querySelector("video");
    const div = document.querySelector("div");
    // const canvas = faceapi.createCanvasFromMedia(video);
    const canvas = document.querySelector("canvas");
    //div.append(canvas);

    //const appended_canvas = document.querySelector("canvas")
    //appended_canvas.style.position = 'relative';
    //appended_canvas.style.top = '45%';
    //appended_canvas.style.left = '25%';

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      //var t0 = performance.now();
      //var id = 1;
      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 960,
            scoreThreshold: 0.4,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();

      console.log(detections);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      if (labeledDescriptors.length == 0) {
        detections.forEach((fd) => {
          let visit_no = 1;
          let lb = this.assignLabel([fd.descriptor]);
          let mood = this.faceExpression(fd.expressions);
          let resizedDetection = faceapi.resizeResults(fd, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetection);
          let Age = this.drawCanvas(fd, canvas, lb);
          this.drawFace(fd, video, lb, Age, mood, visit_no);
        });
      } else {
        const faceMatcher = new faceapi.FaceMatcher(
          labeledDescriptors,
          maxThreshold
        );
        detections.forEach((fd) => {
          let bestMatch = faceMatcher.findBestMatch(fd.descriptor);
          if (bestMatch.distance >= maxThreshold) {
            let visit_no = 1;
            let lb = this.assignLabel([fd.descriptor]);
            let mood = this.faceExpression(fd.expressions);
            let resizedDetection = faceapi.resizeResults(fd, displaySize);
            faceapi.draw.drawDetections(canvas, resizedDetection);
            let Age = this.drawCanvas(fd, canvas, lb);
            this.drawFace(fd, video, lb, Age, mood, visit_no);
          } else if (
            bestMatch.distance < maxThreshold &&
            customer_info.length > 0
          ) {
            let track = 0;
            let mood = this.faceExpression(fd.expressions);
            let resizedDetection = faceapi.resizeResults(fd, displaySize);
            faceapi.draw.drawDetections(canvas, resizedDetection);
            this.drawCanvas(resizedDetection, canvas, bestMatch.label);
            for (var i = 0; i < customer_info.length; i++) {
              if (customer_info[i].name == bestMatch.label) {
                track = i;
              }
            }
            if (customer_info[track].flag == false) {
              ++customer_info[track].vis;
              customer_info[track].expr = mood;
              this.setState({
                msg: "Customer exists",
                name: customer_info[track].name,
                descriptor: lfd,
                url: customer_info[track].face,
                age: customer_info[track].age,
                gender: customer_info[track].gender,
                expr: customer_info[track].expr,
                visit: customer_info[track].vis,
                avg_spend: customer_info[track].avgSpend,
                tot_spend: customer_info[track].totSpend,
                val: id,
              });
              id++;
              customer_info[track].flag = true;
              console.log("SetState executed");
            }
          } else {
            let resizedDetection = faceapi.resizeResults(fd, displaySize);
            faceapi.draw.drawDetections(canvas, resizedDetection);
            this.drawCanvas(resizedDetection, canvas, bestMatch.label);
          }
        });
      }
      // var t1 = performance.now();
      // console.log(t1-t0);
    }, 8000);
  };
  assignLabel = (desc) => {
    let name = "person";
    let token = ++id;
    let label = name + token;
    console.log("Old descriptors: ", desc);
    lfd = new faceapi.LabeledFaceDescriptors(label, desc);
    labeledDescriptors.push(lfd);
    return label;
  };

  drawCanvas = (det, canvas, id) => {
    const age = det.age;
    const interpolatedAge = this.interpolateAgePredictions(age);
    const bottomRight = {
      x: det.detection.box.bottomRight.x - 50,
      y: det.detection.box.bottomRight.y,
    };

    new faceapi.draw.DrawTextField(
      [`${faceapi.utils.round(interpolatedAge, 0)} years` + `\n${id}`],
      bottomRight
    ).draw(canvas);
    let final_age = Math.floor(interpolatedAge);
    // switch(true){
    //     case (final_age < 30): return 'Young';
    //     case (final_age >= 30 && final_age < 55): return 'Middle';
    //     case (final_age >= 55): return 'Old';
    // }
    return final_age;
  };

  drawFace = async (det, video, name, Age, mood, visit_no) => {
    let imgStr = "";
    let box = det.detection.box;
    const regionsToExtract = [
      new faceapi.Rect(box.x, box.y, box.width, box.height),
    ];
    let faceImg = await faceapi.extractFaces(video, regionsToExtract);
    //console.log("faceImg:", faceImg);
    faceImg.forEach((cnv) => {
      imgStr = cnv.toDataURL();
    });
    this.setState({
      msg: "New Customer",
      name: name,
      descriptor: lfd,
      url: imgStr,
      age: Age,
      gender: det.gender,
      expr: mood,
      visit: visit_no,
      avg_spend: 0,
      tot_spend: 0,
      val: id,
    });
    let cinfo = {
      name: name,
      face: imgStr,
      age: Age,
      gender: det.gender,
      expr: mood,
      vis: visit_no,
      avgSpend: 0,
      totSpend: 0,
      flag: true,
    };
    customer_info.push(cinfo);
    console.log(this.state);
  };

  interpolateAgePredictions = (age) => {
    predictedAges = [age].concat(predictedAges).slice(0, 30);
    const avgPredictedAge =
      predictedAges.reduce((total, a) => total + a) / predictedAges.length;
    return avgPredictedAge;
  };

  faceExpression = (expression) => {
    var arr = Object.keys(expression).map(function(key) {
      return expression[key];
    });
    var max = Math.max.apply(null, arr);
    var final_exp = Object.keys(expression).find(
      (key) => expression[key] === max
    );
    return final_exp;
  };

  extractFaceFromDB = () => {
    axios.get("http://localhost:10000/customer/").then((customers) => {
      //console.log(customers.data);
      customers.data.forEach((cd) => {
        let cd_label = cd.label;
        let cd_lfd = cd.descriptor.descriptors;
        let f32arr = [new Float32Array(cd_lfd[0])];
        labeledDescriptors.push(
          new faceapi.LabeledFaceDescriptors(cd.label, f32arr)
        );
        let cinfo = {
          name: cd.label,
          face: cd.picture,
          age: cd.age,
          gender: cd.gender,
          expr: cd.expression,
          vis: cd.visits,
          avgSpend: cd.avg_spending,
          totSpend: cd.total_spending,
          flag: false,
        };
        customer_info.push(cinfo);
      });
      // console.log("Descriptors: ",labeledDescriptors);
      // console.log(customer_info);
    });
  };

  resetFlag = (tg) => {
    let tck = 0;
    for (var i = 0; i < customer_info.length; i++) {
      if (customer_info[i].name == tg) {
        tck = i;
      }
    }
    console.log("Changed flag to false");
    customer_info[tck].flag = false;
  };

  render() {
    return (
        <Grid container spacing={2} style={{padding:'50px'}}>
          <Grid item md={7}>
            <video
              src={demo}
              autoPlay={true}
              style={{objectFit: 'fill'}}
              onPlay={this.faceDetection}
              id="video"
              controls
              height="100%"
              width="100%"
            >
              <canvas
              style={{objectFit: 'fill'}}
              id="canvas"
              position="absolute"
              height="100%"
              width="100%"
              ></canvas>
            </video>
          </Grid>
          <Grid item md={1}>
          </Grid>
          <Grid item md={4}>
            <FaceList
              message={this.state.msg}
              value={this.state.val}
              name={this.state.name}
              desc={this.state.descriptor}
              faceIcon={this.state.url}
              ageClass={this.state.age}
              gender={this.state.gender}
              expression={this.state.expr}
              visitCount={this.state.visit}
              avgSpent={this.state.avg_spend}
              totSpent={this.state.tot_spend}
              purchase={this.props.purchase}
              resetFlag={this.resetFlag}
            ></FaceList>
          </Grid>
        </Grid>
    );
  }
}

export default FaceModel;
