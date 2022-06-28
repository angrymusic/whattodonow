import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import "./App.css";

function App() {
    const isLogin = false;
    return (
        <div className="App">
            <Router>
                <Routes>
                    {isLogin ? (
                        <>
                            <Route path="*" element={<Main />}></Route>
                            <Route path="/main" element={<Main />}></Route>
                        </>
                    ) : (
                        <>
                            <Route path="*" element={<Login />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                        </>
                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
