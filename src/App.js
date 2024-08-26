import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './LogIn';
import SignUp from './SignUp';
import MemberMain from './MemberMain';
import HomePage from './HomePage';
import Contact from './Contact'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LogIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/membermain' element={<MemberMain />} />
                <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </Router>
      )

  }
export default App;
