import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
    const isLogin = useSelector((state) => state.login);
    return (
        <div className="App">
            <Router>
                <Routes>
                    {isLogin ? (
                        <>
                            <Route path="*" element={<Main />}></Route>
                            <Route path="/main" element={<Main />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                        </>
                    ) : (
                        <>
                            <Route path="*" element={<Login />}></Route>
                            <Route path="/signup" element={<Signup />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                        </>
                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
