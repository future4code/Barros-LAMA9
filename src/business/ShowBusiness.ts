import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO } from "../model/Show";
import { AuthenticatorToken } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
    public createShow = async (input: ShowInputDTO) => {
        try {
            const { week_day, start_time, end_time, band_id } = input

            if(week_day !== "sexta" && week_day !== "sábado" && week_day !== "domingo"){
                throw new Error("Dia da semana inválido - Você pode escolher entre sexta, sábado ou domingo")
            }

            if(start_time < "8" && start_time > "23"){
                throw new Error("Horário inválido - O show deve acontecer entre 8h a 23h")
            }

            if(end_time < "8" && end_time > "23"){
                throw new Error("Horário inválido - O show deve acontecer entre 8h a 23h")
            }

            if( start_time !== "8" && "9"&&"10"&&"11"&&"12"&&"13"&&"14"&&"15"&&"16"&&"17"&&"18"&&"19"&&"20"&&"21"){
                throw new Error("Horário inválido - Você pode escolher entre esses horários: 8h, 9h, 10h, 11h, 12h, 13h, 14h, 15h, 16h, 17h, 18h, 19h, 20h, 21h")
            }

            if( end_time !== "10"&&"11"&&"12"&&"13"&&"14"&&"15"&&"16"&&"17"&&"18"&&"19"&&"20"&&"21"&&"22"&&"23"){
                throw new Error("Horário inválido - Você pode escolher entre esses horários: 10h, 11h, 12h, 13h, 14h, 15h, 16h, 17h, 18h, 19h, 20h, 21h, 22h, 23h")
            }
            
            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const show: Show ={
                id,
                week_day,
                start_time,
                end_time,
                band_id
            }

            const showDatabase = new ShowDatabase()

            const showExistHour = await showDatabase.findShowHour(start_time)
            
            if( showExistHour){
                throw new Error("Show já cadastrado")
            }

            await showDatabase.createShow(show)

        } catch (error: any) {
            throw new Error(error.message)

        }
    }
}