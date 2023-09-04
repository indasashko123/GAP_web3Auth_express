import dotenv from "dotenv";

dotenv.config();

interface IMainConfig {
  server : {
    clientUrl: string;
    port : number;
  }
}


export const mainConfig : IMainConfig = {
  server: {
    port : Number(process.env.PORT) || 5000,
    clientUrl : process.env.SERVER_CLIENT_URL
  },  
}
