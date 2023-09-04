import { ITokenResponce, loginRequest } from "@types";
import { User,Hash } from "@database";
import {ethers} from "ethers";
import { tokenService } from "@services";
import {ApiError} from "@exceptions";

class UserService {

    async login(data : loginRequest) : Promise<ITokenResponce> 
    {
        try 
        {
            const user : User = await User.findOne({
            where : { address : data.wallet}});
            if(!user) 
            {
                await User.create({
                    address: data.wallet
                })
            }
            const address : string = ethers.verifyMessage(data.hash,data.message);
            const hash = await Hash.findOne({
                where : {
                   hash : data.hash,
                   active : true      
                }})
            if (address === data.wallet && hash /* validate */ )
            {
                const token : ITokenResponce = await tokenService.generateToken(user);
                return token;
            }
        }  
        catch(e) 
        {
            console.log(e);
        }
    }


    async logout(refreshToken : string) : Promise<void> {
        await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken : string) : Promise<ITokenResponce> {
        if (!refreshToken) {
            throw ApiError.UnautorizesError();
          }
          const userData = await tokenService.validateRefreshToken(refreshToken);
          const tokenFromBd = await tokenService.findToken(refreshToken);
          if (!userData || !tokenFromBd) {
            throw ApiError.UnautorizesError();
          }
          const user = await User.findByPk(userData.id);  
          if (!user) {
            throw new ApiError(500,"User not found");
          }  
          const tokens : ITokenResponce = await tokenService.generateToken(user);
          return tokens;     
    }
}
export const userService = new UserService();