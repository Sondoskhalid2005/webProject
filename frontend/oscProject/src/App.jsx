import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp"
import Login from "./login";
import HomePage from "./HomePage"
import AddLesson from "./addlesson"
import "./style.css"

 function App(){
    
 return(
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/addlesson" element={<AddLesson />} />
      </Routes>

    );
  
}

export default App;