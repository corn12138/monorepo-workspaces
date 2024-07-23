import { useState,useEffect,useRef } from "react";
import * as fabric from "fabric";
import { getPencilBrush } from "./getBrush";

export default function (props) {
    const canvasEl=useRef(null);
    const [canvas,setCanvas]=useState(null);
    const [isErasing, setIsErasing] = useState(false);
    useEffect(()=>{
        const options = {
         isDrawingMode: true,
         width:window.innerWidth,
         height:window.innerHeight,
        };
        const fabricCanvas = new fabric.Canvas(canvasEl.current,options);
     
        fabricCanvas.freeDrawingBrush = getPencilBrush(fabricCanvas);
     
        setCanvas(fabricCanvas);
     
        const resizeCanvas=()=>{
            fabricCanvas.renderAll();
        };
        window.addEventListener("resize",resizeCanvas);
        //clean up event listener
        return ()=>{
            window.removeEventListener("resize",resizeCanvas);
            fabricCanvas.dispose();
        };  
     },[]);

     //
     useEffect(()=>{
        console.log("--->>", props.brushType);
     },[props.brushType]);

     return (
        <>
            <canvas width="100vw" height="100vh" ref={canvasEl}></canvas>
        </>
        
     );
}

