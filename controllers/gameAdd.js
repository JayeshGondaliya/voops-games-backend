import Games from '../model/game.js'


export const gameGet = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Build search condition — 'title' field માં case-insensitive match
    const searchCondition = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalGames = await Games.countDocuments(searchCondition);

    // Fetch filtered & paginated games
    const games = await Games.find(searchCondition)
      .skip(Number(skip))
      .limit(Number(limit));

    res.json({
      success: true,
      data: games,
      totalPages: Math.ceil(totalGames / limit),
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



//get specefic game
export const getGameIndividual=async(req,res)=>{
    try {
        const {code}=req.params;
        if(!code){
            return res.status(404).json({success:false,message:"game id not found"})
        }
        const game=await Games.findOne({code});
        if(!game){
            return res.status(404).json({success:false,message:"not found"})
        }
        return res.status(200).json({success:true,data: game,
            category: game.category})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error.message})
        
    }
}



//find all category

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Games.distinct('category');
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



//search
// GET /api/game/search/:query
// If query is empty, return all games
export const search = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category } = req.query;

    let query = {};

    if (search) {
      // search hoy to category ignore karo ane search pr filter karo
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
        ],
      };
    } else if (category) {
      // search nathi, to category thi filter karo
      query = { category };
    }

    const skip = (page - 1) * limit;

    const games = await GameModel.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await GameModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: games,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching games" });
  }
};
