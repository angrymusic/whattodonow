import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/login.css";
const address = "http://localhost:8000/";

export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [userData, setUserData] = useState();
    //사용자 정보 받아오기
    useEffect(() => {
        axios
            .get(address + "getUsers")
            .then((res) => {
                console.log("res: " + res);
                setUserData(res.data);
                console.log("userData: " + userData);
            })
            .catch();
    }, []);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log("click login");
    };
    const onClickSignUp = () => {
        console.log("click signup");
    };

    return (
        <div className="backGround">
            <div className="logo">What To Do Now?</div>
            <div className="inputBox">
                <div className="inputBoxContainer">
                    <div>
                        <label htmlFor="input_id">ID : </label>
                        <input type="text" name="input_id" value={inputId} onChange={handleInputId} />
                    </div>
                    <div>
                        <label htmlFor="input_pw">PW : </label>
                        <input type="text" name="input_pw" value={inputPw} onChange={handleInputPw} />
                    </div>
                    <div>
                        <button type="button" onClick={onClickLogin}>
                            회원가입
                        </button>
                        <button type="button" onClick={onClickSignUp}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
