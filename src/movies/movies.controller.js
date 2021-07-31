const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
async function list(req, res) {
    const is_showing = req.query.is_showing;
    
    if(is_showing != undefined){
        if (is_showing == "true"){
            //console.log(is_showing)
        const queryData = await service.listIsShowing(1);
        //console.log(queryData);
        return res.json({data: queryData})

        }
     const meData = await service.listIsShowing(0);
     return res.json({data: meData});
    }
  const data = await service.list();
  //console.log({data});
  return res.json({ data });
  
}
async function validId(req,res,next){
    const {movieId} = req.params;
    const allMovies = await service.list();
    const movieExists = allMovies.find((movie)=>movie.movie_id == movieId);
    
    if (movieExists != undefined){
        res.locals.movieId = movieId;
     next();   
    } else {
        
     return res.status(404).json({error: "Movie cannot be found"});
    };
   
}

async function read(req,res){
     const {movieId} = req.params;
     //console.log(req.query.is_showing);
     const data = await service.read(movieId);
     //console.log(data)
     return res.json({data});
}

async function listTheaters(req,res){
    const data = await service.listTheatersForMovie(res.locals.movieId);
return res.json({data});
}

async function listReviewsForMovie(req,res,next){

    const data = await service.listReviewsForMovie(res.locals.movieId);
    let newData = await Promise.all(data.map( async (object, index)=>{
        const {review_id, content, score, movie_id, critic_id} = object;
        const currentCritic = await service.readCritic(critic_id);
       
        const review = {'review_id': review_id,'content':content,'score':score, "movie_id": movie_id, "critic_id":critic_id, "critic": currentCritic[0]};
       
        return review;
    }));
    //console.log(newData);
    return res.json({data: newData})
}

module.exports = {
  list,
  read: [validId,read],
  listTheaters: [validId, listTheaters],
  listReviewsForMovie: [validId, listReviewsForMovie],
};