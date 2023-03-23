import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowInputDTO } from "../model/Show";

export class ShowController{

    public createShow = async (req: Request, res: Response)=>{
        try{
            const dados = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id,
            }

            const input: ShowInputDTO ={
                week_day: dados.week_day,
                start_time: dados.start_time,
                end_time: dados.end_time,
                band_id: dados.band_id
            }

            const showBusiness = new ShowBusiness()
            await showBusiness.createShow(input)

            res.status(201).send({ message: "Show cadastrado com sucesso" });

        }catch(error:any){
            res.status(400).send(error.message)
        }
    }

    public getShow = async (req: Request, res: Response) =>{
        try{
            const week_day = req.params.week_day

            const showBusiness = new ShowBusiness()
            const result = await showBusiness.getShow(week_day)

            res.status(201).send({ message: `Shows de ${week_day}:`, result });

        }catch(error:any){
            res.status(400).send(error.message)
        }
    }
}