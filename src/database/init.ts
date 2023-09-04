import { sequelizeInstance } from "./postgress";


export const init = async () => {
    const conn = async() =>
    {
        await sequelizeInstance.authenticate();
        await sequelizeInstance.sync();
    }
    await conn();
}