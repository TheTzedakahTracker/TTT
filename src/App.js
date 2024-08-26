import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './LogIn';
import SignUp from './SignUp';
import MemberMain from './MemberMain';
import AI from "./AIApp";
import TestComp from "./AI/components/TestComp";
import ChatComponent from "./AI/components/ChatComponent";

function App() {
    return (
        <Router>
          <Routes>
            <Route path='/login' element={<LogIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/membermain' element={<MemberMain />} />
            <Route path='/test' element={<TestComp />} />
            <Route path='/ai' element={<AI />} />
            <Route path='/chatcomponent' element={<ChatComponent />} />
          </Routes>
        </Router>
      )

  }
export default App;
