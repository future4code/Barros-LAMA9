import { BandDatabase } from "../data/BandDatabase";
import { Band, BandInputDTO } from "../model/Band";
import { AuthenticatorToken } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness{
    public createBand = async (input: BandInputDTO) =>{
        try{
            const { name, music_genre , responsible , token } = input
                    
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const authenticator = new AuthenticatorToken()
            const id_integrante = authenticator.getTokenData(token)

            const band: Band={
                id,
                name,
                music_genre,
                responsible: id_integrante.id
            }

            const bandDatabase = new BandDatabase()
            await bandDatabase.createBand(band)

        }catch(error:any){
            throw new Error(error.message)
        }
    }

    public bandDetails = async (id:string)=>{
        try{
            const id_band = id

            const bandDatabase = new BandDatabase()
            await bandDatabase.bandDetails(id_band)

        }catch(error:any){
            throw new Error(error.message)
        }
    }
}