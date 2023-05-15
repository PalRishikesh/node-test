"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(express.urlencoded({extended:false}));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*'
}));
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     next();
//     });
app.use(routes_1.default);
app.post("/", (req, res) => {
    res.send({
        data: req.body
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});
