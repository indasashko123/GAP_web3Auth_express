import {Router} from "express";
import { hashController } from "@controllers";
export const router : Router =  Router();

router.post("/createHash", hashController.createHash);