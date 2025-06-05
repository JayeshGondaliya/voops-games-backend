import express from 'express';
import { categoryGames } from '../controllers/categoryGame.js';
const categoryRouter=express.Router();



categoryRouter.get("/:category",categoryGames);


export default categoryRouter;