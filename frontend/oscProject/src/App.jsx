import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp"
import Login from "./login";
import HomePage from "./HomePage"
import "./style.css"

 function App(){
    
 return(
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>

    );
  
}

export default App;