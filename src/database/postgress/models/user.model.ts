import { UUID } from "crypto";
import { Model, Table,Column, DataType} from "sequelize-typescript";
import {v4} from "uuid";

interface UserCreationAttr {
    address : string
}


@Table({
    tableName: "users",
})
export class User extends Model<User, UserCreationAttr> {
    
    @Column({
        type : DataType.UUIDV4,
        unique: true,
        defaultValue : v4(),
        primaryKey: true,
    })
    id : UUID;
    
    @Column({
        type : DataType.STRING,
        unique: true,
        allowNull: false,
    })
    address : string;
}