import { UUID } from "crypto";
import {v4} from "uuid";
import { Model, Table, Column, DataType} from "sequelize-typescript";

interface HashCreationAttr {
    address:string;
    hash : string;
}


@Table({
    tableName: "hashes",
})
export class Hash extends Model<Hash, HashCreationAttr> {
    
    @Column({
        type : DataType.UUIDV4,
        unique: true,
        defaultValue: v4(),
        primaryKey: true,
    })
    id : UUID;
     
    @Column({
        type : DataType.STRING,
        unique: true,
        allowNull: false,
    })
    hash : string;

    @Column({
        type : DataType.STRING,
        allowNull: false,
    })
    address : string;

    @Column({
        type : DataType.BOOLEAN,
        defaultValue: true,
    })
    active : boolean;
}

