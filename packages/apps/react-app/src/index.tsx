import ReactDom from 'react-dom/client';
import React from 'react';
import App from './app';
import "./index.less"
import { Performance } from './utils/apis';

ReactDom.createRoot(document.getElementById("root") as Element)
    .render(<App />)

Performance.init();