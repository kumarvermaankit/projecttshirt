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
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import Glyphicon from "react-bootstrap"
import CBTN from "../components/3dbutton"
export default function Custom(){


const { selectedObjects, editor, onReady } = useFabricJSEditor();
const [currentcolor,setcurrentcolor] = useState("red")

// const [canvas,setcanvas] = useState(null)
// const canvasRef = useRef(null);


// useEffect(()=>{

//     setcanvas(new fabric.Canvas(canvasRef.current))

// },[setcanvas])

useEffect(()=>{

    document.getElementById("tshirt-color").addEventListener("change", function(){
        document.getElementById("tshirt-div").style.backgroundColor = this.value;
    }, false);

    document.addEventListener("keydown", function(e) {
        var keyCode = e.keyCode;
        

        if(keyCode == 46){
            console.log("Removing selected element on Fabric.js on DELETE key !");
            editor?.canvas.remove(editor?.canvas.getActiveObject());
        }
    }, false);
},[])


function changeColor(color){
    setcurrentcolor(color)
  
    selectedObjects.map((each)=>{
     each.set({fill:color})
     editor?.canvas.add(each)
    })

 

}

function addShape(shape){

    if(shape === "circle"){
        editor.addCircle()
    }
    else if(shape === "rectangle"){
        editor.addRectangle()
    
    }
    else if(shape === "line"){
        editor.addLine()
    }
}

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

      function addCustom(event){

        var reader = new FileReader();
            
        reader.onload = function (event){
            var imgObj = new Image();
            imgObj.src = event.target.result;

            // When the picture loads, create the image in Fabric.js
            imgObj.onload = function () {
                var img = new fabric.Image(imgObj);

                img.scaleToHeight(150);
                img.scaleToWidth(150); 
                editor?.canvas.centerObject(img);
                editor?.canvas.add(img);
                editor?.canvas.renderAll();
            };
        };

        // If the user selected a picture, load it
        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]);
            
        }
     
    }



    function download(){
        domtoimage.toBlob(document.getElementById("tshirt-div")).then(function (blob) {
            saveImage(blob)
          });
    }

    function Addtext(){

        var text = new fabric.Textbox('Add Text', { left: 20, top: 100 ,fontFamily:"string"});
        editor?.canvas.add(text)
    }


    function Shadow(){

        selectedObjects.map((each)=>{
            console.log(each)
        })

    }



return(
    <div>
        <div id="tshirt-div">
          
            <img id="tshirt-backgroundpicture" src={tshirt}/>

            <div id="drawingArea" className="drawing-area">					
                <div className="canvas-container">
                <FabricJSCanvas id="tshirt-canvas"  className="sample-canvas" onReady={onReady} />

                    {/* <canvas id="tshirt-canvas" ref={canvasRef} width="220" height="460"></canvas> */}
                </div>
            </div>
        </div>
        <br />
        <br />
        
        {/* <p>To remove a loaded picture on the T-Shirt select it and press the <kbd>DEL</kbd> key.</p>
        <br/>
        <label for="tshirt-design">T-Shirt Design:</label>
        <select id="tshirt-design">
            <option value="">Select one of our designs ...</option>
            <option value="./batman_small.png">Batman</option>
        </select> */}

        <br/>
        {/* <label for="tshirt-color">T-Shirt Color:</label>
        <select id="tshirt-color">
            <option value="#fff">White</option>
            <option value="#000">Black</option>
            <option value="#f00">Red</option>
            <option value="#008000">Green</option>
            <option value="#ff0">Yellow</option>
        </select> */}

        <br/>
        <label for="tshirt-custompicture">Upload your own design:</label>
        <input onChange={(event)=>addCustom(event)} type="file" id="tshirt-custompicture" />
        
        {/* <button onClick={download} >Download</button> */}
        <CBTN text = "D" click={download} />
        <CBTN text = "T" click={Addtext} />
        <CBTN text = "S" click={Shadow} />
        {/* <button onClick={Addtext} >Text</button> */}
        <select onChange={(event)=>addShape(event.target.value)} id="tshirt-color">
            <option value="circle">Circle</option>
            <option value="rectangle">Rectangle</option>
            <option value="line">Line</option>
            
        </select>
        {/* <button>Shapes</button> */}
        
        {/* <button onClick={Shadow}> Add Stroke</button> */}
        
        <SketchPicker onChange={(color)=>changeColor(color.hex)} color={currentcolor}/>
        <button >+</button>
        <input id="font" />
        <button >-</button>

        
       
        </div>
)

}