const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}
function listIsShowing(is_showing){
    return knex({a:"movies"}).join({b:"movies_theaters"}, {'a.movie_id':'b.movie_id'}).select("a.*").distinct().where({"b.is_showing": is_showing});
}
function read(movieId){
    return knex("movies").select("*").where({movie_id: movieId}).first();
}

function listTheatersForMovie(movieId){
return knex({a:"movies_theaters"}).join({b:"movies"}, {'a.movie_id': 'b.movie_id'}).join({c:"theaters"}, {'a.theater_id': 'c.theater_id'}).select("c.*", 'a.*').where({"b.movie_id": movieId});
}

function listReviewsForMovie(movieId){
return knex('critics').join('reviews', {'critics.critic_id': 'reviews.critic_id'}).select("reviews.*").where({"reviews.movie_id": movieId});
}

function listMoviesForTheater(theater_id){
  return knex("movies_theaters").select("*").where({"theater_id":theater_id});
}

function readCritic(critic_id){
  return knex('critics').select("*").where({"critics.critic_id": critic_id});
}
module.exports = {
  list,
  read,
  listIsShowing,
  listTheatersForMovie,
  listReviewsForMovie,
  listMoviesForTheater,
  readCritic
};

