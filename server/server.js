const express = require("express");
const app = express();
const PORT = process.env.port || 8000;
const mysql = require("mysql");
const dbName = "whattodonow";
const tableName = "login_data";
const cors = require("cors");
const { json } = require("express");
let corsOptions = {
    origin: "*",
    Credential: true,
};
app.use(express.json()); //json 형식 데이터 교환을 위해
app.use(cors(corsOptions)); //CORS 오류 방지를 위해
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: dbName,
    multipleStatements: true,
});

//foreign key 구현해야함!
app.get("/", (req, res) => {
    //TABLE 생성
    const sqlCMD =
        "CREATE TABLE IF NOT EXISTS LOGIN_DATA(NO INT AUTO_INCREMENT PRIMARY KEY,ID VARCHAR(20) NOT NULL,PW VARCHAR(20) NOT NULL);";
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
            res.send("SUCCESS GET to /");
        }
    });
});

app.post("/login", (req, res) => {
    let inputId = req.body.inputId.inputId;
    let inputPw = req.body.inputPw.inputPw;
    let resultResponse = false; //일치 계정이 있으면 true
    const sqlCMD = "SELECT * from " + tableName;
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.map((user) => {
                if (user.ID === inputId && user.PW === inputPw) {
                    resultResponse = true;
                }
            });
        }
        res.json(resultResponse);
    });
});

app.post("/checkid", (req, res) => {
    let inputId = req.body.inputId.inputId;
    let resultResponse = true; //중복아이디가 없으면 true
    const sqlCMD = "SELECT * from " + tableName;
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.map((user) => {
                if (user.ID === inputId) {
                    resultResponse = false;
                }
            });
        }
        res.json(resultResponse);
    });
});
app.post("/signup", (req, res) => {
    let inputId = req.body.inputId.inputId;
    let inputPw = req.body.inputPw.inputPw;
    let resultResponse = true; //계정 생성에 성공하면 true
    const sqlCMD = "INSERT INTO LOGIN_DATA(ID, PW) VALUES('" + inputId + "','" + inputPw + "')";
    db.query(sqlCMD, (err, result) => {
        if (err) {
            resultResponse = false;
            console.log(err);
        }
        res.json(resultResponse);
    });
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
