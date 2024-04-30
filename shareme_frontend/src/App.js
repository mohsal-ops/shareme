import './App.css';
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom'
import { Login } from './components/login';
import { Home } from './container/home';
import { fetchUser } from './utils/fetchUser';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = fetchUser()

    if(!user) navigate('/login')
   
  }, [])
  
  
  return (
    <div className="App">
   <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
        
    </div>
  );
}

export default App;
