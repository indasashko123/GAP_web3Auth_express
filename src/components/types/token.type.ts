import { UUID } from "crypto";
import { User } from "../../database";




export interface ITokenResponce {
    access : string;
    refresh : string;
}

export interface IToken {
    id : UUID;
    access : string;
    refresh : string;
    userId : UUID;
    user : User
}