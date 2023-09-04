import {Request, Response, NextFunction } from "express";
import { hashService } from "@services";



class HashController {
    //POST
    async createHash(req : Request, res : Response, next : NextFunction) {
        try { 
            const hash = await hashService.createHash(req.params.address);
            res.status(200).json(hash);
        } catch(e) {
            console.log(e);
        }
    }
}

export const hashController = new HashController();