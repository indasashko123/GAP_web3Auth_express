import dotenv from "dotenv";

dotenv.config();

interface ITokenConfig {
  refreshExpires : number;
  accessExpires : number;
  refreshSalt : string;
  accessSalt : string;

}


export const tokenConfig : ITokenConfig = {
  refreshExpires : Number(process.env.REFRESH_TOKEN_EXPIRES),
  accessExpires : Number(process.env.ACCESS_TOKEN_EXPIRES),
  refreshSalt : process.env.REFRESH_TOKEN_SALT,
  accessSalt : process.env.ACCESS_TOKEN_SALT
}