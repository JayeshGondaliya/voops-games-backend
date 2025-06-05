import Games from '../model/game.js';
import mongoose from 'mongoose';
export const categoryGames=async(req,res)=>{
    try {
        const {category}=req.params;
     if(!category){
    return res.status(400).json({success:false,message:"required category"})
    }
    const games=await Games.find({category})
    if(games.length<=0){
        return res.status(200).json({success:false,message:"game is not availabe"})
    }
    return res.status(200).json({success:true,data:games})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error.message})
        
    }
}



//delete game
export const deleteGames=async(req,res)=>{
    try {
        const {gameId}=req.params;
        console.log(gameId);
        
        if(!mongoose.Types.ObjectId.isValid(gameId)){
            return res.status(400).json({success:false,message:"gameId is required"})
        }

        const deletedGame = await Games.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ success: false, message: "Game not found" });
    }
 
        return res.status(200).json({success:true,message:"game successfully delete"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error.message})
        
    }
}





//update games
export const updatedGames=async(req,res)=>{
    try {
        const {gameId}=req.params;
        const {title,description,dimension,format,tags,gamelink,image,category}=req.body
        if(!mongoose.Types.ObjectId.isValid(gameId)){
            return res.status(400).json({success:false,message:"gameId is required"})
        }

        const updaedGames=await Games.findById(gameId);
if(!updaedGames){
    return res.status(404).json({success:false,message:"game not found"})
}
        updaedGames.title=title
        updaedGames.description=description
        updaedGames.dimension=dimension
        updaedGames.format=format
        updaedGames.tags=tags
        if (gamelink === undefined) updaedGames.gameLink = gamelink;
        if (image === undefined) updaedGames.image = image;
        updaedGames.category=category
        await updaedGames.save()
        return res.status(200).json({success:true,message:"game will be updated"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error.message})
        
    }
}