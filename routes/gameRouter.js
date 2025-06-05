import express from 'express';
import {  gameGet,  getAllCategories,  getGameIndividual, search } from '../controllers/gameAdd.js';
const gameRouter=express.Router();

gameRouter.get("/gameGet",gameGet);
gameRouter.get("/getGameIndividual/:code",getGameIndividual);
gameRouter.get("/all-categories", getAllCategories);
gameRouter.get("/search/:query", search);
export default gameRouter;