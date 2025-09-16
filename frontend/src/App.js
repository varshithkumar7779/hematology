import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Check from './page/Check';
import Signup from './page/Signup';
import Login from './page/Login';
import Checkdl from './page/Checkdl';
import './App.css';      

function App() {  
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Check" element={<Check/>} />
          <Route path="/Checkdl" element={<Checkdl/>} />
        </Routes>
    </Router>
    </>)
}

export default App;