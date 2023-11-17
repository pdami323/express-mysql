const db = require('../models');
const User = db.User;
const Comment = db.Comment;
const Company = db.Company;

const insertUser = async(req, res)=>{
    let info = {
        name : req.body.name,
        age : req.body.age,
        married : req.body.married,
        company : req.body.company,
        commenter : req.body.commenter
    };

    try{
        const user = await User.create(info).catch((err)=>console.log(err));
        res.status(201).send(user);
    }catch(err){
        console.error(err);
    }
}

const selectUserList = async(req, res)=>{
    try {
        associate();
        const userList = await User.findAll({
            include : [
                {
                    model : Comment, attributes : ["comment"]
                },
                {
                    model : Company, attributes : ["name"]
                }
            ],
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'commenter']
            }
        });
        res.json(userList);
    }catch(err){
        console.error(err);
    }
}

const selectUser = async(req, res)=>{
    try{
        associate();
        const id = req.params.id;
        const user = await User.findOne({
            include : [
                {
                    model : Comment, attributes : ["comment"]
                },
                {
                    model : Company, attributes : ["name"]
                }
            ],
            where : {
                id : id
            },
            attributes : {
                exclude : ["married", "commenter"]
            }
        });
        res.send(user);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

const updateUser = async(req, res) => {
    try{
        const id = req.params.id;
        const result = await User.update(req.body, {
            where : {id : id}
        });

        res.send({message : "updated Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

const deleteUser = async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await User.destroy({
            where : {id : id}
        });
        res.status(200).send({message : "deleted Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

const associate = async(req, res)=>{
    Company.hasMany(User, {foreignKey : "company", sourceKey : "id"});
    User.belongsTo(Company, {foreignKey : "company", sourceKey : "id"});
}

module.exports = {insertUser, selectUserList, selectUser, updateUser, deleteUser};