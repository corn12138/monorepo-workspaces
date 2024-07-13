import React from "react";
import { HashRouter, useRoutes,BrowserRouter } from 'react-router-dom';

import { router } from "./router";

type Props = {};

const Routers = () => useRoutes(router);

const App: React.FC = ({ }: Props) => {
    return (
        <BrowserRouter>
            <Routers></Routers>
        </BrowserRouter>
    )
}

export default App;