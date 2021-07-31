const knex = require("../db/connection");
function list() {
    return knex("reviews").select("*");
  }
function updateReviews(reviewId, data){
  
   return knex("reviews").where({"reviews.review_id": reviewId}).update(data);
};

function destroyReview(reviewId){
return knex("reviews").where({"reviews.review_id": reviewId}).del();
}

function read(reviewId){
  return knex("reviews").select("*").where({"reviews.review_id": reviewId});
}

module.exports = {list,
update: updateReviews,
read,
delete: destroyReview,
}