import logo from './logo.svg';
import './App.css';
import Quora from './components/Quora';
import Login from './authentication/login';
function App() {
  return (
    <div className="App">
      <Quora/>
      {/* <Login/> */}
    </div>
  );
}

export default App;
