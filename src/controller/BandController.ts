import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController{
    async createBand (req: Request, res: Response){
        try{
            const dados = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible : req.body.responsible,
                token: req.headers.authorization as string
            }

            console.log(dados)

            const input: BandInputDTO={
                name: dados.name,
                music_genre: dados.music_genre ,
                responsible: dados.responsible ,
                token: dados.token
            }

            const bandBusiness = new BandBusiness() 
            const result = await bandBusiness.createBand(input)

            //console.log(result)

            res.status(201).send({ message: "Banda cadastrada com sucesso" });


        }catch(error:any){
            res.status(400).send(error.message)
        }
    }   
}