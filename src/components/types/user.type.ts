import { UUID } from "crypto";
import { Token } from "../../database";

export interface IUser {
    id : UUID;
    address : string;
}