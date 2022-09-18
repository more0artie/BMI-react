import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import { useState } from 'react';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Home from './components/home';

function App() {
  const [Email,setEmail] = useState("user@mail.com");
  const [name,setName] = useState("User")
  const CallBack = (res) =>{
    setEmail(res.email);
    setName(res.name)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signIn" element={<SignIn parentCallBack={CallBack}/>}/>
        <Route path="/home" element={<Home email={Email} name={name}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
