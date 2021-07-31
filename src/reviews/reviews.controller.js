const service = require("./reviews.service");
const moviesService = require("../movies/movies.service");
async function destroy(req, res, next){
    const {reviewId} = req.params;
    const date = await service.delete(reviewId);
    return res.status(204).json({message: "No Content" });
};
async function validId(req,res,next){
    const {reviewId} = req.params;
    const allReviews = await service.list();
    const reviewExists = allReviews.find((review)=>review.review_id == reviewId);
    //const body = req.body;
    if (reviewExists != undefined){
     //console.log(body);
     res.locals.reviewId = reviewId;
     next();   
    } else {
        
     return res.status(404).json({error: "Review cannot be found."});
    };
   
};
async function update(req,res,next){   
    const body = req.body;
    
    await service.update(res.locals.reviewId, body.data);
    const newData = await service.read(res.locals.reviewId);
    const criticData = await moviesService.readCritic(newData[0].critic_id);
    const {content, review_id, score, critic_id, movie_id, created_at, updated_at} = newData[0];
    const critic = criticData[0];
    const newObj = {critic, content, review_id, score, critic_id, movie_id, created_at, updated_at};
res.send({data: newObj});
};
module.exports = {delete:[validId, destroy],
update: [validId, update],};