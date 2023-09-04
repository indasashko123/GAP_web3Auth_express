import  { Sequelize, Dialect } from 'sequelize';
import {databaseConfig} from '../../config';

export const sequelizeInstance = new Sequelize(
    databaseConfig.dataBaseOptions.database,
    databaseConfig.dataBaseOptions.username,
    databaseConfig.dataBaseOptions.password,
    {
        host : databaseConfig.dataBaseOptions.host,
        dialect: databaseConfig.dataBaseOptions.dialect as Dialect,
    }
)