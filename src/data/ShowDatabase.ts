import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase{
    private static NOME_TABELA_SHOWS = "NOME_TABELA_SHOWS";

     public createShow = async (show:Show) =>{
        try{
            await BaseDatabase.connection()
                .insert(show)
                .into(ShowDatabase.NOME_TABELA_SHOWS)

        }catch(error:any){
            throw new Error(error.message)
        }
     }

     public findShowId = async (band_id:string) =>{
        try{
            const result = await ShowDatabase.connection(ShowDatabase.NOME_TABELA_SHOWS)
                .select()
                .where({band_id})

            return result[0]

        }catch(error:any){
            throw new Error(error.message)
        }
     }

     public findShowHour = async (hour:string) =>{
        try{
            const result = await ShowDatabase.connection(ShowDatabase.NOME_TABELA_SHOWS)
                .select()
                .where(`start_time = ${hour}`)

            return result[0]

        }catch(error:any){
            throw new Error(error.message)
        }
     }
}