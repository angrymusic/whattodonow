import {Routes, Route} from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import './App.css';

function App() {
  const isLogin = true;
  return (
    <div className="App">
      <Routes>
        {isLogin ? (
          <>
            <Route path="/main" element={<Main />}></Route>
          </>
        ):(
          <>
            <Route path="/login" element={<Login/>}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
