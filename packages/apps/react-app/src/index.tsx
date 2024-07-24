import ReactDom from 'react-dom/client';
import React from 'react';
import App from './app';
import "./index.less"
import { Performance } from './utils/apis';

import store from './store'; //引入store
import { Provider } from 'react-redux'; //引入Provider

ReactDom.createRoot(document.getElementById("root") as Element)
    .render(
        <Provider store={store}>
            <App />
        </Provider>
    );

Performance.init();