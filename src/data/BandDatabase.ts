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
}