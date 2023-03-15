import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase{
    private static NOME_TABELA_BANDAS = "NOME_TABELA_BANDAS";

    public async createBand(band:Band){

        try{
            await BaseDatabase.connection()
                .insert(band)
                .into(BandDatabase.NOME_TABELA_BANDAS)

        }catch(error:any){
            throw new Error(error.message)
        }
    }

    public bandDetais = async (id:string) =>{
        try{
            const band = await BaseDatabase.connection()
                .select("*")
                .from(BandDatabase.NOME_TABELA_BANDAS)
                .where({id})

            return band

        }catch(error:any){
            throw new Error(error.message)
        }
    }
}