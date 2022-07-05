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
app.use(express.json());
app.use(cors(corsOptions));
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: dbName,
    multipleStatements: true,
});

//foreign key 구현해야함!
app.get("/", (req, res) => {
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

app.post("/getUsers", (req, res) => {
    let inputId=req.body.inputId.inputId;
    let inputPw=req.body.inputPw.inputPw;
    let resultResponse = false;
    const sqlCMD = "SELECT * from " + tableName;
    db.query(sqlCMD, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.map((user)=>{
                if(user.ID===inputId && user.PW===inputPw){
                    resultResponse=true;
                }
            });
            res.json(resultResponse);
        }
    });
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});