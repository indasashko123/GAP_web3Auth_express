import crypto from "crypto";
import { Hash } from "@database";
import {AbiCoder, ethers} from "ethers";
import { cryptoConfig } from "../../config";



class HashService {
    async createHash(address : string) : Promise<Hash> {
        try {
            const lastHash : Hash[] = await Hash.findAll({

                where : {
                    address : address
                }
            })
            if (lastHash.length !== 0) {
                lastHash.forEach(async (hash) => {
                    hash.active = false;
                    await hash.save();
                })
            }
            const coder : AbiCoder= new ethers.AbiCoder();
            const randomHash : string = crypto.randomBytes(10).toString();
            const mess : string = coder.encode(['address','string','string'],[address,randomHash,cryptoConfig.salt]);
            return await Hash.create({
              address : address,
              hash : mess
            })
        } catch(e) {
            console.log(e);
        }        
    }
}

export const hashService = new HashService();