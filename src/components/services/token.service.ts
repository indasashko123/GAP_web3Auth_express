import { tokenConfig } from "@config";
import { Token, User } from "@database";
import { ApiError } from "@exceptions";
import { ITokenResponce } from "@types";
import jwt from "jsonwebtoken";


class TokenService {
    async generateToken(user : User): Promise<ITokenResponce> {
        const payload = {
            address : user.address,
            id : user.id,
            role : "role"
        }
        const accessToken : string = jwt.sign(payload,tokenConfig.accessSalt, {expiresIn: tokenConfig.accessExpires,});
        const refreshToken : string = jwt.sign(payload,tokenConfig.refreshSalt, {expiresIn: tokenConfig.refreshExpires,});
        await this.saveToken(user, refreshToken);
        return {
            access : accessToken, 
            refresh : refreshToken
        } 
    }

    private async saveToken(user : User, refreshToken: string) {
        const tokenData = await Token.findOne({
            where : {
                userId : user.id
            }  
        })
        if (tokenData) {
            tokenData.refresh = refreshToken;
            await tokenData.save();
            return tokenData;
        }
        return await Token.create({
            userId : user.id,
            refresh : refreshToken,
        }) 
    }

    async removeToken(refreshToken : string) : Promise<void> {
        const tokenData = await Token.destroy({
            where : {
                refresh : refreshToken
            }
        });
    }

    async validateAccessToken (token : string) : Promise<any> {
        try {
            const userData = jwt.verify(token, tokenConfig.accessSalt);
            return userData;
        } catch (e) {
            throw ApiError.UnautorizesError();
        }
    }

    async validateRefreshToken (token : string) : Promise<any> {
        try {
           const userData = jwt.verify(token, tokenConfig.refreshSalt);
           return userData;
        } catch (e) {
            throw ApiError.UnautorizesError();
        }
    }

    async findToken(refresh : string) : Promise<Token> {
        const tokenData = await Token.findOne({
            where : {
                refresh : refresh
            }
        });
        if (!tokenData) {
            throw ApiError.UnautorizesError();
        }
        return tokenData;
    }
}

export const tokenService = new TokenService();