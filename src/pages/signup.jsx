import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/signup.css";

axios.defaults.baseURL = "";
const address = "http://3.34.2.64:8000/";

export default function Signup() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [changeId, setChangeId] = useState(true);
    const navigate = useNavigate();

    const handleInputId = (e) => {
        setInputId(e.target.value);
        setChangeId(true);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const onClickSignUp = async () => {
        if (changeId) {
            //아이디중복체크해주세요 알림
            console.log("have to check id first");
            return;
        }
        const { data: result } = await axios.post(address + "signup", {
            inputId: { inputId },
            inputPw: { inputPw },
        });
        console.log(result);
        if (result) {
            console.log("signup success"); //계정 생성 성공! 화면이동
            goToLogin();
        } else {
            console.log("signup fail");
        }
    };
    const onClickCheckId = async () => {
        const { data: result } = await axios.post(address + "checkid", {
            inputId: { inputId },
        });
        console.log(result);
        if (result) {
            //아이디 중복 체크 성공! 알림
            setChangeId(false);
            console.log("ID check success");
        } else {
            console.log("ID check fail");
        }
    };
    return (
        <div className="signup-backGround">
            <div className="signup-header"> 회원가입 </div>
            <div className="signup-inputBox">
                <div className="signup-inputBoxContainer">
                    <div className="signup-blanks">
                        <label className="signup-label" htmlFor="input_id">
                            아이디{"\b "}
                        </label>
                        <input
                            className="signup-blank"
                            type="text"
                            name="input_id"
                            value={inputId}
                            onChange={handleInputId}
                        />
                    </div>
                    <div className="signup-blanks">
                        <label className="signup-label" htmlFor="input_pw">
                            비밀번호{"\b "}
                        </label>
                        <input
                            className="signup-blank"
                            type="text"
                            name="input_pw"
                            value={inputPw}
                            onChange={handleInputPw}
                        />
                    </div>

                    <div className="signup-buttons">
                        <button className="signup-button" type="button" onClick={onClickCheckId}>
                            아이디중복체크
                        </button>
                        <button className="signup-button" type="button" onClick={onClickSignUp}>
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
            <div className="signup-footer"></div>
        </div>
    );
}
