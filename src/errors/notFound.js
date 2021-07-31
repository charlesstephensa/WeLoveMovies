function notFound(req,res,next){
    return res.status(404).json({error:"path Not Found"});

}

module.exports = notFound;