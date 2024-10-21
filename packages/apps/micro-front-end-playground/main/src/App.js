/* eslint-disable jsx-a11y/iframe-has-title */
import logo from './logo.svg';
import './App.css';
import { useState, useMemo, useEffect } from 'react';
const urlMap = {
  child1: 'http://localhost:4001',
  child2: 'http://localhost:4002',
}

function App() {
  const [page, setPage] = useState('child1');
  const url = useMemo(() => urlMap[page], [page]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:4001' || event.origin !== 'http://localhost:4002') return;
      console.log('event', event.data);
    });
  }, []);

  return (
    <div >
      <header> this header</header>
      <button onClick={() => { setPage('child1') }}> 切换到child1</button>
      <button onClick={() => { setPage('child2') }}> 切换到chil2</button>
      <iframe src={url} frameBorder={0} />
    </div>
  );
}

export default App;
