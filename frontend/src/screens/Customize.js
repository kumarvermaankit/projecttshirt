import React, { useEffect, useState } from "react";
import { fabric } from 'fabric';
import domtoimage from "dom-to-image-more";
import "../styles/customize.css"
import storage from "../fire_base"
import tshirt from "../assets/background_tshirt.png"
// import { saveAs } from 'file-saver';
// import { uploadBytes,ref } from "firebase/storage";
// import FontSizeChanger from 'react-font-size-changer';
// import FontPicker from "font-picker-react"
import { SketchPicker } from 'react-color'
import ColorPicker from "../components/colorpicker"


import { FabricJScanvas, useFabricJSEditor } from 'fabricjs-react'
export default function Designer(){


  // const storageRef = ref(storage,"images/file")

    const { selectedObjects, editor, onReady } = useFabricJSEditor();

    const [design,setdesign] = useState(null)
    const [tshirtimg,settshirt] = useState(null)
    const [fontvalue,setfontvalue] = useState(5)
    const [currentcolor,setcurrentcolor] = useState("red")
    // const [canvas,setcanvas] = useState(null)
    function saveImage(file){
        const uploadtask = storage.storage().ref(`images/${"i1"}`).put(file)
                uploadtask.on(
                  "state_changed",
                  snapshot => { },
                  error => {
                    console.log(error)
                  },
                  () => {
                    storage.storage()
                      .ref("images")
                      .child("i1")
                      .getDownloadURL()
                      .then(imgurl => {
                          console.log(imgurl)
                      })

                  })
    }

let canvas = null
    useEffect(()=>{
      canvas = new fabric.Canvas('tshirt-canvas');
        // setcanvas(canvas)
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


        // function updatetext()
        
        
        
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

   
    // function addCustom(event){
    //     let canvass = new fabric.canvass('tshirt-canvas');

    //     var reader = new FileReader();
            
    //     reader.onload = function (event){
    //         var imgObj = new Image();
    //         imgObj.src = event.target.result;

    //         // When the picture loads, create the image in Fabric.js
    //         imgObj.onload = function () {
    //             var img = new fabric.Image(imgObj);

    //             img.scaleToHeight(150);
    //             img.scaleToWidth(150); 
    //             canvass.centerObject(img);
    //             canvass.add(img);
    //             canvass.renderAll();
    //         };
    //     };

    //     // If the user selected a picture, load it
    //     if(event.target.files[0]){
    //         reader.readAsDataURL(event.target.files[0]);
    //         setdesign(event.target.files[0]);
    //     }
    //     setcanvas(canvass)
    // }

    // console.log(canvas)

    function download(){
        domtoimage.toBlob(document.getElementById("tshirt-div")).then(function (blob) {
            saveImage(blob)
          });
    }

    function Addtext(){

        if(canvas !==null){

        var text = new fabric.Textbox('Add Text', { left: 20, top: 100 ,fontFamily:"string"});
        
        canvas.add(text);
        }
    }

    function incdecfont(state){

        if(canvas !==null){

        var object = canvas.getActiveObject()
        var val = document.getElementById("font")

        if(object !== undefined){

        if(state === true){
            object.fontSize = object.fontSize + 1
           
        }
        else{
            object.fontSize = object.fontSize - 1
            

        }
        val.value = object.fontSize
        canvas.add(object)
        }
    }
    }

    function changeFontSize(){

        if(canvas !==null){

        var val = document.getElementById("font").value
       
        var object = canvas.getActiveObject()
        
        object.fontSize = Number(val)
        canvas.add(object)
        }
    }

    
    function changeFont(family){

        if(canvas !==null){

        var object = canvas.getActiveObject()
        
        if(object !== undefined){
            object.fontFamily = family
            // object.set("fontFamily","Macondo")
            canvas.add(object)
        }

    }

    }

    function changeColor(color){
        setcurrentcolor(color)
      
        if(canvas !== null){
            var object = canvas.getActiveObject()
            if(object !== undefined){
                object.set({fill:color})
                canvas.add(object)
            }
        }
     

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
        
        <button onClick={download}>Download</button>
        <button onClick={Addtext}>Text</button>
        <button>Shapes</button>
        <button>Color Box</button>
        <button>Stroke</button>
        
        {/* <FontSizeChanger
          
          onChange={(element, newValue, oldValue) => {
            console.log(element, newValue, oldValue);
          }}
          options={{
            stepSize: 2,
            range: 3
          }}
          customButtons={{
            up: <span style={{'fontSize': '36px'}}>A</span>,
            down: <span style={{'fontSize': '20px'}}>A</span>,
           
            buttonsMargin: 10
          }}          
        /> */}
        <button onClick={()=>incdecfont(true)}>+</button>
        <input id="font" onChange={changeFontSize} />
        <button onClick={()=>incdecfont(false)}>-</button>
        {/* <FontPicker
                    apiKey="AIzaSyDrXmeVCb65FyUs4cRGlpbf__MXMfNDC74"
                    
                    onChange={(nextFont) =>
                        changeFont(nextFont.family)
                    }
                /> */}
        <SketchPicker onChange={(color)=>changeColor(color.hex)} color={currentcolor}/>
        {/* <ColorPicker /> */}
        </div>

    )    
    
}