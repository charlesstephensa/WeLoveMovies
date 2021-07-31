const service = require("./theaters.service");
const moviesService = require("../movies/movies.service");
async function list(req,res,next){
const data = await service.listTheaters();
//console.log(data);
const newData = await Promise.all(data.map(async (theater, index)=>{
    //console.log(theater.theater_id)
    const moviesInTheater = await moviesService.listMoviesForTheater(theater.theater_id);
    const movies = await Promise.all(moviesInTheater.map(async (movie)=>{
       return await moviesService.read(movie.movie_id);
    }));
    const {theater_id, name, address_line_1, address_line_2, city, state,zip} = theater;
    const newObj = {theater_id, name, address_line_1, address_line_2, city, state, zip, movies};
    return newObj;
   
}));
res.send({data: newData})
};

module.exports={list};