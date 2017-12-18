const express = require('express');
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database : 'tms'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql Connected');
});

const app = express();

app.get('/authenticate',(req,res) => {

    console.log(req.query);

    let sql = `select * from users where username='${req.query.username}' AND password = '${req.query.password}' `;
    let query = db.query( sql ,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
});

app.listen(3000, () => {
    console.log('Server started on 3000');
});