"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const promise_1 = require("mysql2/promise");
function DbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = (0, promise_1.createPool)({
            host: process.env.HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            connectionLimit: 10,
            multipleStatements: true
        });
        console.log("connection: ", pool);
        return pool;
    });
}
exports.DbConnection = DbConnection;
module.exports = {
    DbConnection
};
