"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("mysql"));
const uuid_1 = require("uuid");
const usersRouter = (0, express_1.Router)();
const middleWare = (request, response, next) => {
    const uuId = request.body.uuid;
    request.body.user_id = null;
    const pool = getConn();
    pool.getConnection((err, conn) => {
        if (err) {
        }
        conn.query("SELECT id FROM users WHERE uuid=?", [uuId], (err, rows) => {
            if (err) {
                conn.release();
                next();
            }
            else {
                request.body.user_id = rows[0].id;
                conn.release();
                next();
            }
        });
    });
};
usersRouter.get('/', (request, response) => {
    return response.json('OK');
});
const getConn = () => {
    var pool = mysql_1.default.createPool({
        host: process.env.HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 10,
        multipleStatements: true
    });
    return pool;
};
// usersRouter.get('/test',UserController.getUser());
usersRouter.get("/test", (req, res) => {
    const question = [
        {
            "id": 1,
            "quesion": "What is Angular",
            "answer": 2,
            "options": ["Language", "Library", "Framework", "Dependency Injection"]
        },
        {
            "id": 2,
            "quesion": "What is nodejs",
            "answer": 2,
            "options": ["It's a Javascript library", "It's a JS Framework", "Run Time Enviroment", "Compile Time Enviroment"]
        },
        {
            "id": 3,
            "quesion": "Nodjes is single Threaded",
            "answer": 1,
            "options": ["No", "Yes"]
        },
        {
            "id": 4,
            "quesion": "How can we call promise function without callback?",
            "answer": 1,
            "options": ["Promise", "Async await", ".then", "wait promise"]
        },
        {
            "id": 5,
            "quesion": "How can we achieved Multithreading in Nodejs",
            "answer": 3,
            "options": ["Making changes in Config file", "By using thread function", "We can't make multithreading", "worker thread"]
        }
    ];
    return res.status(200).json({
        message: "success",
        status: true,
        data: question
    });
});
usersRouter.get("/:uuid", (req, res) => {
    const uuId = req.params.uuid;
    const pool = getConn();
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("Entered into error");
            return res.send({
                success: false,
                statusCode: 500,
                message: 'Error in connection...'
            });
        }
        conn.query("SELECT * FROM users WHERE uuid=?", [uuId], (err, rows) => {
            if (err) {
                console.log("query errror : ", err);
                return res.status(400).json({
                    message: "some thing went wrong!",
                    success: false
                });
            }
            else {
                console.log(rows);
                conn.release();
                if (rows.length == 0) {
                    return res.status(404).json({
                        message: "success",
                        status: false,
                        data: {}
                    });
                }
                return res.status(200).json({
                    message: "success",
                    status: true,
                    data: rows[0]
                });
            }
        });
    });
    // return res.send({
    //     data:req.body
    // })
});
usersRouter.post('/', (req, res) => {
    console.log("Post Body");
    console.log(req.body);
    const { name, email, phone } = req.body;
    console.log("Name :", name);
    console.log("email :", email);
    console.log("phone :", phone);
    const uuId = (0, uuid_1.v4)();
    console.log("randmon id: ", uuId);
    const pool = getConn();
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("Entered into error");
            return res.send({
                success: false,
                statusCode: 500,
                message: 'Error in connection...'
            });
        }
        let queryStatement = `INSERT INTO users(uuid,name,email,phone)  VALUES ?  `;
        let queryValue = [[uuId, name, email, phone]];
        conn.query(queryStatement, [queryValue], (err, results, fields) => {
            if (err) {
                console.log("query errror : ", err);
                return res.status(400).json({
                    message: "some thing went wrong!",
                    success: false
                });
            }
            else {
                console.log("query exectured : ", results);
                conn.release();
                return res.status(200).json({
                    message: "success",
                    status: true,
                    data: []
                });
            }
        });
    });
    // return res.send({
    //     data:req.body
    // })
});
usersRouter.post('/test', middleWare, (req, res) => {
    console.log("Post Body");
    console.log(req.body);
    const { uuid, question_count, correct_answer_count, user_id } = req.body;
    let queryValue = [[user_id, question_count, correct_answer_count]];
    const pool = getConn();
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("Entered into error");
            return res.send({
                success: false,
                statusCode: 500,
                message: 'Error in connection...'
            });
        }
        let queryStatement = `INSERT INTO tests(user_id,question_count,correct_answer_count)  VALUES ?  `;
        conn.query(queryStatement, [queryValue], (err, results, fields) => {
            if (err) {
                console.log("query errror : ", err);
                return res.status(400).json({
                    message: "some thing went wrong!",
                    success: false
                });
            }
            else {
                console.log("query exectured : ", results);
                conn.release();
                return res.status(200).json({
                    message: "success",
                    status: true,
                    data: []
                });
            }
        });
    });
    // return res.send({
    //     data:req.body
    // })
});
exports.default = usersRouter;
