import { Request, Response } from "express";

function indexWelcome(req:Request, res:Response){
    return res.json('Welcome to API');
}

export {
    indexWelcome
};