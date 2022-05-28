import React from "react"
import "../styles/3dbtn.css"
export default function CBTN(props){
    return (
        <div id="container" onClick={props.click}>
    
        <div className="button-main">
        	<div className="button-inside">
            	<h1 className="header">{props.text}</h1>
            </div>
        </div>
        </div>
    )
}