import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mainConfig } from "@config";
import { router } from "@routes";
import { init } from "@database";
import { errorMiddleware } from "./middlewares/error.middleware";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("api",router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await init();
        app.listen(mainConfig.server.port, ()=> {
        console.log("started");
       })     
    } catch(e) {
        console.log(e);
    }
}
start();