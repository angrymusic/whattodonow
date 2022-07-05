import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/login.css";
const address = "http://localhost:8000/";

export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [isExist, setIsExist] = useState(null);
    const [loginTry, setLoginTry] = useState(false);

    //사용자 정보 받아오기
    useEffect(() => {}, [loginTry]);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickLogin = async() => {
        const {data:result} = await axios.post(address + "getUsers",{
            inputId: { inputId },
            inputPw: { inputPw },
        });
        console.log(result);
        if (result) {
            //로그인 성공! 화면이동
            console.log("login success");
        } else {
            console.log("login fail");
        }
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
                        <button type="button" onClick={onClickSignUp}>
                            회원가입
                        </button>
                        <button type="button" onClick={onClickLogin}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
