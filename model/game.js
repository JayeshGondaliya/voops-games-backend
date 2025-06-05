import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dimension: { type: String, required: true, default: "1478x16" },
    format: { type: String, required: true },
    tags: { type: [String] } ,
    gameLink:{type:String,required:true},
    image:{type:String,required:true},
    category: {
        type: String,
        enum: ['Educational', 'Racing', 'Quiz','Arcade','Logic','Sports','Adventure','Action']  
      }
});

const Game = mongoose.model("game", gamesSchema);

export default Game;
