import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
   <div>child1</div>
   <button onClick={()=>{
   window.parent.postMessage({data:"child1给父组件发送消息"})
   }}>child1给父组件发送消息</button>
    </div>
  );
}

export default App;
