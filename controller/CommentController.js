const db = require('../models');
const Comment = db.Comment;
const User = db.User;

const insertComment = async(req, res)=>{
    let info = {
        comment : req.body.comment,
        commenter : req.body.commenter
    };

    const comment = await Comment.create(info).catch((err)=>console.log(err));
    res.status(201).send(comment);
}

const selectComment = async(req, res)=>{
    let id = req.params.id;
    const commentsList = await Comment.findAll({
        include : {
            model : User, 
            attributes : ['name'],
            where : {id : id}
        },
        attributes : ['comment']
    });
    res.json(commentsList);
}

module.exports = {insertComment, selectComment};