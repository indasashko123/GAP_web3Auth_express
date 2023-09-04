import dotenv from "dotenv";

dotenv.config();

interface ICryptoConfig {
  salt : string;
}


export const cryptoConfig : ICryptoConfig = {
  salt : process.env.HASH_CRYPTO_SALT
}
