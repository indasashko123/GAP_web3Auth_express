import { UUID } from "crypto";
import {v4} from "uuid";
import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "@database";

interface TokenCreationAttr {
    userId : UUID;
    refresh : string;
}


@Table({
    tableName: "tokens",
})
export class Token extends Model<Token, TokenCreationAttr> {
    
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
    refresh : string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    userId : UUID;

    @BelongsTo(()=> User)
    user : User

}