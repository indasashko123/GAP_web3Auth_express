import dotenv from 'dotenv';
dotenv.config();

interface IDatabaseConfig {
  dataBaseOptions: {
    dialect: string,
    host : string,
    port : number,
    username : string,
    password : string,
    database : string,
  },
}



export const databaseConfig : IDatabaseConfig = {
  dataBaseOptions: {
    dialect: "postgres",
    host : process.env.POSTGRES_HOST ,
    port : Number(process.env.POSTGRES_PORT),
    username : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.POSTGRES_DATABASE,
  },
};