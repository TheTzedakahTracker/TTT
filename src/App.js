import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './LogIn';
import SignUp from './SignUp';
import MemberMain from './MemberMain';
import MakeDonation from "./MakeDonation";


function App() {
    return (
        <Router>
          <Routes>
            <Route path='/login' element={<LogIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/' element={<MemberMain />} />
            <Route path='/donate' element={<MakeDonation />} />
          </Routes>
        </Router>
      )

  }
export default App;
