import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUp from "./SignUp"
import Login from "./login";
import HomePage from "./HomePage"
import AddLesson from "./addlesson"
import Courses from "./coursespage";
import Dashboard from "./dashbord";
import Chatbot from "./Chatbot"
import "./style.css"

 function App(){
    
 return(
      <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
        <Chatbot />
    </BrowserRouter>

    );
  
}

export default App;