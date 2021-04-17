import * as faceapi from 'face-api.js';
import '../css/styles.css';
import React, { Component, useState , createRef } from 'react';
import axios from 'axios';
import demo from '../demo.mp4';
import { idText } from 'typescript';

const detectedFaces = [];
const labeledDescriptors = [];
const predictedAges = [];
let id = 1;

class FaceModel extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            descriptor: [],
            url: "",
            age: 0,
            gender: "male",
            expr: "happy"
        }
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            faceapi.nets.ageGenderNet.loadFromUri("/models"),])
            .then(console.log("loading."));
        
        //this.video = createRef();
        this.myCanvas = createRef();

        this.assignLabel = this.assignLabel.bind(this);
        this.drawCanvas = this.drawCanvas.bind(this);
        this.drawFace = this.drawFace.bind(this);
        this.interpolateAgePredictions = this.interpolateAgePredictions.bind(this);
    }

    faceDetection = () => {
        const maxThreshold = 0.6;
        let counter = 0;
        var facematcher;
        //this.id.current = 1;
        const video = document.querySelector("video");
        const div = document.querySelector("div");
        const canvas = faceapi.createCanvasFromMedia(video);
        div.append(canvas);  
        const appended_canvas = document.querySelector("canvas")
        //appended_canvas.style.position = 'relative';
        //appended_canvas.style.top = '45%';
        //appended_canvas.style.left = '25%';

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            var t0 = performance.now();
            var id = 1;
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

                if(labeledDescriptors.length == 0){
                    detections.forEach(fd => {
                        let lb = this.assignLabel([fd.descriptor]);
                        let resizedDetection = faceapi.resizeResults(fd, displaySize);
                        faceapi.draw.drawDetections(canvas, resizedDetection);
                        // drawCanvas(fd, canvas, lb);
                        this.drawFace(fd, video, lb);
                    });
                }
                else{
                    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, maxThreshold);
                    detections.forEach(fd => {
                        let bestMatch = faceMatcher.findBestMatch(fd.descriptor);
                        if(bestMatch.distance >= maxThreshold){
                            let lb = this.assignLabel([fd.descriptor]);
                            let resizedDetection = faceapi.resizeResults(fd, displaySize);
                            faceapi.draw.drawDetections(canvas, resizedDetection);
                            // drawCanvas(fd, canvas, lb);
                            this.drawFace(fd, video, lb);
                        }
                        else{
                            let resizedDetection = faceapi.resizeResults(fd, displaySize);
                            //console.log(resizedDetection);
                            faceapi.draw.drawDetections(canvas, resizedDetection);
                            // drawCanvas(resizedDetection, canvas, bestMatch.label);
                            // drawFace(fd, video);
                        }
                    });
                }
                var t1 = performance.now();
                console.log(t1-t0);
        }, 8000);
       
    }
    assignLabel = (desc) => {
        let name = 'person';
        let token = id++;
        let label = name+token;
        labeledDescriptors.push(
        new faceapi.LabeledFaceDescriptors(label, desc)
        );
        // console.log(labeledDescriptors);
        // let stat = {
        // label: label,
        // descriptor: desc
        // }
        // axios.post('http://localhost:10000/customer/add', state)
        //   .then(res => console.log(res.data));
        this.setState({
            name: label,
            descriptor: desc
        });
        console.log(this.state);
        return label;
    }

    drawCanvas = (det, canvas, id) => {
        const age = det.age;
        const interpolatedAge = this.interpolateAgePredictions(age);
        const bottomRight = {
          x: det.detection.box.bottomRight.x - 50,
          y: det.detection.box.bottomRight.y,
        };
    
        new faceapi.draw.DrawTextField(
          [`${faceapi.utils.round(interpolatedAge, 0)} years`+`\n${id}`],
          bottomRight
        ).draw(canvas);
    }

    drawFace = async (det, video, name) => {
        let box = det.detection.box;
        const regionsToExtract = [
          new faceapi.Rect( box.x, box.y, box.width, box.height )
        ]
        let faceImg = await faceapi.extractFaces(video, regionsToExtract);
        console.log("faceImg:", faceImg);
        faceImg.forEach(cnv =>{
            let distinctFace = {};
            distinctFace["name"] = name;
            distinctFace["url"] = cnv.toDataURL();
            detectedFaces.push(distinctFace);
          });
        console.log("Detected Faces:");
        console.log(detectedFaces);
    }

    interpolateAgePredictions = (age) => {
        predictedAges = [age].concat(predictedAges).slice(0, 30);
        const avgPredictedAge =
          predictedAges.reduce((total, a) => total + a) / predictedAges.length;
        return avgPredictedAge;
    }
    
    render(){
        return(
            <div id="div">
                <video src={demo} autoPlay={true} onPlay={this.faceDetection} id="video" controls height="540" width="720"></video>
            </div>
        );
    }
}

export default FaceModel;