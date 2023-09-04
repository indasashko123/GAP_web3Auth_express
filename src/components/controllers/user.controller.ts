import {Request, Response, NextFunction } from "express";
import { ITokenResponce, loginRequest } from "@types";
import { userService } from "@services";
import { mainConfig, tokenConfig } from "@config";



class UserController {

    async login(req : Request, res : Response, next : NextFunction) {
        try {
           const data: loginRequest = req.body;
           const token : ITokenResponce = await userService.login(data); 
            
           res.cookie("refreshToken",token.refresh, {
            maxAge : tokenConfig.accessExpires * 1000,
            httpOnly: true
            });

           res.status(200).json(token);
        } catch(e){
            next(e);
        }
    }

    async logout(req : Request, res : Response, next : NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.redirect(mainConfig.server.clientUrl);        
        } catch(e) {
            next(e);
        }
    }
    
    async refresh(req : Request, res : Response, next : NextFunction) {
        try{
            const {refreshToken} = req.cookies("refreshToken");
            const userData = await userService.refresh(refreshToken);           
            res.cookie("refreshToken",userData.refresh, {
             maxAge : tokenConfig.accessExpires * 1000,
             httpOnly: true
         });
         }catch(e){
             next(e);
         }
 
    }
    async getUsers(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
           
        } catch(e) {
            next(e);
        }
    }
}

export const userController = new UserController()