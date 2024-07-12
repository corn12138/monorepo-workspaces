import  ReactDom  from "react-dom/client";
import React from "react";
import App from "./app";
//引入 tailwindcss
import "./tailindex";

ReactDom.createRoot(document.getElementById("root") as Element).render(<App />)
