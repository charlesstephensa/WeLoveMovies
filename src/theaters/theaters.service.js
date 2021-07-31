const knex = require("../db/connection");
function listTheaters(){
    return knex("theaters").select("*");
}

module.exports={listTheaters};