import express, { Request, Response } from 'express';

import routes from './routes';
import dotenv from 'dotenv';

import cors from "cors";
dotenv.config();

const app = express();
// app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({
    origin:'*'
}));


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     next();
//     });


app.use(routes);


app.post("/",(req: Request,res: Response)=>{
    res.send({
        data:req.body
    })
});

app.listen(process.env.PORT,()=>{
    console.log(`Server on port ${process.env.PORT}`);
    
});