import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MemberMain from './MemberMain';

function App() {
    return (
        <Router>
          <Routes>
            <Route path='/membermain' element={<MemberMain />} />
          </Routes>
        </Router>
      );
}

export default App;
