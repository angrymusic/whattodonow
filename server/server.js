const express = require("express");
const app = express();
const PORT = process.env.port || 8000;
const mysql = require("mysql");
const dbName = "whattodonow";
const table_login = "login_data";
const table_todo = "todo_data";
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
    dateStrings: "date",
});

//foreign key 구현해야함!
app.get("/", (req, res) => {
    console.log("receive request /");
    //TABLE 생성
    const sqlCMD =
        "CREATE TABLE IF NOT EXISTS LOGIN_DATA(NO INT AUTO_INCREMENT PRIMARY KEY,ID VARCHAR(20) NOT NULL,PW VARCHAR(20) NOT NULL);" +
        "CREATE TABLE IF NOT EXISTS TODO_DATA(NO INT AUTO_INCREMENT PRIMARY KEY,ID VARCHAR(20) NOT NULL,TODO VARCHAR(50) NOT NULL,DEADLINE DATE NOT NULL,DONE BOOLEAN NOT NULL DEFAULT 0);";
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
    console.log("receive request /login");
    let inputId = req.body.inputId.inputId;
    let inputPw = req.body.inputPw.inputPw;
    let resultResponse = false; //일치 계정이 있으면 true
    const sqlCMD = "SELECT * from " + table_login;
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
    console.log("receive request /checkid");
    let inputId = req.body.inputId.inputId;
    let resultResponse = true; //중복아이디가 없으면 true
    const sqlCMD = "SELECT ID from " + table_login;
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
    console.log("receive request /signup");
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
app.post("/addtodo", (req, res) => {
    console.log("receive request /addtodo");
    let inputId = req.body.inputId.inputId;
    let inputDate = req.body.inputDate.inputDate;
    let inputToDo = req.body.inputToDo.inputToDo;
    let resultResponse = true; //계정 생성에 성공하면 true
    const sqlCMD =
        "INSERT INTO TODO_DATA(ID, TODO, DEADLINE) VALUES('" + inputId + "','" + inputToDo + "','" + inputDate + "')";
    db.query(sqlCMD, (err, result) => {
        if (err) {
            resultResponse = false;
            console.log(err);
        }
        res.json(resultResponse);
    });
});
app.post("/gettodo", (req, res) => {
    console.log("receive request /gettodo");
    let inputId = req.body.inputId.inputId;
    let todolist = [{ CONNECTION: "SUCCESS" }];
    const sqlCMD = "SELECT * from " + table_todo;
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.map((user) => {
                if (user.ID === inputId) {
                    todolist.push(user);
                }
            });
        }
        res.json(todolist);
    });
});

app.post("/deletetodo", (req, res) => {
    console.log("receive request /deletetodo");
    let inputNo = req.body.NO;
    let resultResponse = false; //todo 삭제에 성공하면 true
    const sqlCMD = "DELETE from " + table_todo + " WHERE NO = " + inputNo + ";";
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            resultResponse = true;
        }
        res.json(resultResponse);
    });
});
app.post("/updatecheck", (req, res) => {
    console.log("receive request /updatecheck");
    let inputNo = req.body.NO;
    let checked = req.body.CHECKED;
    let resultResponse = false; //todo 삭제에 성공하면 true
    const sqlCMD = "UPDATE " + table_todo + " SET DONE = " + checked + " WHERE NO = " + inputNo + ";";
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            resultResponse = true;
        }
        res.json(resultResponse);
    });
});
app.post("/updatetodo", (req, res) => {
    console.log("receive request /updatetodo");
    let inputNo = req.body.NO;
    let inputToDo = req.body.TODO;
    let inputDeadline = req.body.DEADLINE;
    let resultResponse = false; //todo 수정에 성공하면 true
    const sqlCMD = "UPDATE " + table_todo + " SET TODO = '" + inputToDo +"', DEADLINE = '" + inputDeadline + "' WHERE NO = " + inputNo + ";";
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            resultResponse = true;
        }
        res.json(resultResponse);
    });
});
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
