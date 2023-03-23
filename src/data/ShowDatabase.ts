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

     public getShow = async (week_day:string) =>{
        try{

            const result = await BaseDatabase.connection.raw(`
                SELECT banda.name, banda.music_genre 
                FROM NOME_TABELA_BANDAS banda, NOME_TABELA_SHOWS shows
                WHERE "${week_day}" = shows.week_day;
            `);     

            return result[0]

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

     public findShowHour = async (start_time:string) =>{
        try{
            const result = await ShowDatabase.connection(ShowDatabase.NOME_TABELA_SHOWS)
                .select()
                .where({start_time})

            return result[0]

        }catch(error:any){
            throw new Error(error.message)
        }
     }
}