import React from "react";
import { HashRouter, useRoutes } from 'react-router-dom';

import {router} from "./router";

type Props = {};

const Routers = ()=>useRoutes(router);

const App:React.FC = ({}:Props)=>{
    return (
        <HashRouter>
            <Routers></Routers>
        </HashRouter>
    )
}

export default App;