import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './LogIn';
import SignUp from './SignUp';

function App() {
    return (
        <Router>
          <Routes>
            <Route path='/LogIn' element={<LogIn/>} />
            <Route path='/SignUp' element={<SignUp/>} />
          </Routes>
        </Router>
      )
}

export default App;
