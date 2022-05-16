import React, { useEffect, useState } from "react";
import { fabric } from 'fabric';
import domtoimage from "dom-to-image-more";
import "../styles/customize.css"
import storage from "../fire_base"
import tshirt from "../assets/background_tshirt.png"
import { saveAs } from 'file-saver';
import { uploadBytes,ref } from "firebase/storage";
export default function Designer(){


    const storageRef = ref(storage,"images/file")


    const [design,setdesign] = useState(null)
    const [tshirtimg,settshirt] = useState(null)
    function saveImage(file){
        const uploadtask = storage().ref(`images/${file.name}`).put(file)
        
        uploadtask.on(
          "state_changed",
          snapshot => { },
          error => {
            console.log(error)
          },
          () => {
            storage()
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then(imgurl => {
                    console.log(imgurl)
            })
            })
    }

    useEffect(()=>{
        let canvas = new fabric.Canvas('tshirt-canvas');
        // console.log(canvas)
        function updateTshirtImage(imageURL){
            fabric.Image.fromURL(imageURL, function(img) {                   
                img.scaleToHeight(150);
                img.scaleToWidth(150); 
                canvas.centerObject(img);
                canvas.add(img);
                canvas.renderAll();
            });
        }
        
        // Update the TShirt color according to the selected color by the user
        document.getElementById("tshirt-color").addEventListener("change", function(){
            document.getElementById("tshirt-div").style.backgroundColor = this.value;
        }, false);

        // Update the TShirt color according to the selected color by the user
        document.getElementById("tshirt-design").addEventListener("change", function(){

            // Call the updateTshirtImage method providing as first argument the URL
            // of the image provided by the select
            updateTshirtImage(this.value);
        }, false);

        // When the user clicks on upload a custom picture
        document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
            var reader = new FileReader();
            
            reader.onload = function (event){
                var imgObj = new Image();
                imgObj.src = event.target.result;

                // When the picture loads, create the image in Fabric.js
                imgObj.onload = function () {
                    var img = new fabric.Image(imgObj);

                    img.scaleToHeight(150);
                    img.scaleToWidth(150); 
                    canvas.centerObject(img);
                    canvas.add(img);
                    canvas.renderAll();
                };
            };

            // If the user selected a picture, load it
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0]);
                setdesign(e.target.files[0]);
            }
        }, false);

        // When the user selects a picture that has been added and press the DEL key
        // The object will be removed !
        document.addEventListener("keydown", function(e) {
            var keyCode = e.keyCode;

            if(keyCode == 46){
                console.log("Removing selected element on Fabric.js on DELETE key !");
                canvas.remove(canvas.getActiveObject());
            }
        }, false);

    },[])

    function download(){
        domtoimage.toBlob(document.getElementById("tshirt-div")).then(function (blob) {
            
          });
    }

    return(
        <div>
        <div id="tshirt-div">
          
            <img id="tshirt-backgroundpicture" src={tshirt}/>

            <div id="drawingArea" className="drawing-area">					
                <div className="canvas-container">
                    <canvas id="tshirt-canvas" width="220" height="460"></canvas>
                </div>
            </div>
        </div>
        <br />
        <br />
        
        <p>To remove a loaded picture on the T-Shirt select it and press the <kbd>DEL</kbd> key.</p>
        <br/>
        <label for="tshirt-design">T-Shirt Design:</label>
        <select id="tshirt-design">
            <option value="">Select one of our designs ...</option>
            <option value="./batman_small.png">Batman</option>
        </select>

        <br/>
        <label for="tshirt-color">T-Shirt Color:</label>
        <select id="tshirt-color">
            <option value="#fff">White</option>
            <option value="#000">Black</option>
            <option value="#f00">Red</option>
            <option value="#008000">Green</option>
            <option value="#ff0">Yellow</option>
        </select>

        <br/>
        <label for="tshirt-custompicture">Upload your own design:</label>
        <input type="file" id="tshirt-custompicture" />
        
        <button onClick={download} >Download</button>

        </div>
    )    
    
}