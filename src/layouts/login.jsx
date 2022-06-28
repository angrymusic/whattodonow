import React, {useState, useEffect} from 'react';

import './style/login.css';

export default function Login(){
    const [inputId, setInputId]=useState('');
    const [inputPw, setInputPw]=useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios.get('/user_inform/login')
    //     .then(res => console.log(res))
    //     .catch()
    // },
    // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    // [])

    return(
        <div className="backGround">
            <div className='logo'>
                What To Do Now?
            </div>
            <div className="inputBox">
                <div className="inputBoxContainer">
                    <div>
                        <label htmlFor='input_id'>ID : </label>
                        <input type='text' name='input_id' value={inputId} onChange={handleInputId}/>
                    </div>
                    <div>
                        <label htmlFor='input_pw'>PW : </label>
                        <input type='text' name='input_pw' value={inputPw} onChange={handleInputPw}/>
                    </div>
                    <div>
                        <button type='button' onClick={onClickLogin}>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}