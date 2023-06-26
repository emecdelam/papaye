import { useEffect, useRef, useState } from "react"
import { Node } from "slate"
import katex from "katex"
export default function Math(props) {
    
    return (
        <>
        
        <div  {...props.attributes} style={{display: "flex"}}>
            <p style={{backgroundColor: "red"}}>{props.children}</p>
        </div>
        
        </>
    )
}