import express from "express";
import { BandController } from "../controller/BandController";
import { ShowController } from "../controller/ShowController";


export const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/create", showController.createShow);
