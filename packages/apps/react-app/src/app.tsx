import React from 'react';
import styles from './app.module.less';
import { HashRouter, useRoutes,unstable_HistoryRouter } from 'react-router-dom';
import { router } from './router';


type Props = {}
const Routers  = () => useRoutes(router);

function App({}: Props) {
  return (
    <HashRouter>
      <Routers />
    </HashRouter>
       
  )
}

export default App