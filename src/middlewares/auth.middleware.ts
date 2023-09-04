import { ApiError } from "@exceptions";
import { tokenService } from "@token";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req : Request,res : Response, next : NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnautorizesError());
        }
        const bearer = authHeader.split(" ")[1];
        if (!bearer) {
            return next(ApiError.UnautorizesError());
        }
        const validate = await tokenService.validateAccessToken(bearer);
        if (!validate) {
            return next(ApiError.UnautorizesError());
        }
        req.user = validate;
        next();
    } catch(e) {
        return next(ApiError.UnautorizesError());
    }            
}