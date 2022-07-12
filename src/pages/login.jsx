import React, { useState } from "react";
import axios from "axios";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const address = "http://localhost:8000/";

export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickLogin = async () => {
        const { data: result } = await axios.post(address + "login", {
            inputId: { inputId },
            inputPw: { inputPw },
        });
        console.log(result);
        if (result) {
            //로그인 성공! 화면이동
            console.log("login success");
            dispatch({
                type:'login'
            })
            goToMain(inputId);
        } else {
            console.log("login fail");
        }
    };
    const onClickSignUp = () => {
        console.log("click signup");
        goToSignUp();
    };

    const goToSignUp = () => {
        navigate("/signup");
    };

    const goToMain = (userId) => {
        navigate("/main", {
            state: {
                ID: userId,
            },
        });
    };
    return (
        <div className="login-backGround">
            <div className="login-header">What To Do Now?</div>
            <div className="login-inputBox">
                <div className="login-inputBoxContainer">
                    <div className="login-blanks">
                        <label className="login-label" htmlFor="input_id">
                            아이디{"\b "}
                        </label>
                        <input className="login-blank" type="text" name="input_id" value={inputId} onChange={handleInputId} />
                    </div>
                    <div className="blanks">
                        <label className="login-label" htmlFor="input_pw">
                            비밀번호{"\b "}
                        </label>
                        <input className="login-blank" type="text" name="input_pw" value={inputPw} onChange={handleInputPw} />
                    </div>

                    <div className="login-buttons">
                        <button className="login-button" type="button" onClick={onClickSignUp}>
                            회원가입
                        </button>
                        <button className="login-button" type="button" onClick={onClickLogin}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
            <div className="login-footer">made by angrymusic</div>
        </div>
    );
}
