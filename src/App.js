import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import LogIn from './LogIn';
import SignUp from './SignUp';
import MemberMain from './MemberMain';
import HomePage from './HomePage';
import Contact from './Contact';
import DonationHistory from "./DonationHistory";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };
    return (
      <Router>
        <NavBar user={user} handleLogout={handleLogout}/>
            <Routes>
          <Route path='/' element={<HomePage user={user} handleLogout={handleLogout}/>} />
                <Route
                  path='/login'
                  element= {user ? <Navigate to="/" /> : <LogIn setUser={setUser} />}
                />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/donationhistory' element={<DonationHistory/>}/>
                <Route path='/membermain' element={<MemberMain/>} />
                <Route
                  path='/membermain'
                  element= {user ? <MemberMain user={user} /> : <Navigate to="/login" />}
                />
                <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </Router>
      )

  }
export default App;
