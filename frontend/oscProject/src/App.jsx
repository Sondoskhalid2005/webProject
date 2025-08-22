import {  Routes, Route } from "react-router-dom";
import SignUp from "./SignUp"
import "./style.css"
 function App (){
    
 return(
    
        <Routes>
            <Route path = "/SignUp" element={<SignUp/>}/>
            <Route path = "/Home" element={<h1>welcome to home page</h1>}/>
        </Routes>
    
    );
  
}

export default App;