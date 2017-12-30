const express = require('express');
const mysql = require('mysql');
const qs = require('querystring');
const bodyParser = require('body-parser');   

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

app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/authenticate',(req,res) => {

    let sql = `select * from users where username='${req.body.username}' AND password = '${req.body.password}' `;
    let query = db.query( sql ,(err,result) => {
        if(err) throw err;
        console.log(req.body.username);
         // return the information including token as JSON
         res.json({
            success: true,
            message: 'Enjoy your token!',
            token: 'tmstoken'
         });

         return res.send();

        //  return res.status(403).send({ 
        //     success: false, 
        //     message: 'No token provided.' 
        // });
    
    })
});

app.listen(3000, () => {
    console.log('Server started on 3000');
});