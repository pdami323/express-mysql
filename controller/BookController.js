const db = require('../models');
const Book = db.Book;
const User = db.User;

const selectBook = async(req, res)=>{
    let id = req.params.id;
    User.hasMany(Book, {foreignKey : "author", sourceKey : 'id'});
    Book.belongsTo(User, {foreignKey : "author", sourceKey : "id"});
    const book = await Book.findOne({
        include : [
            {
                model : User, attributes : ["name"]
            }
        ],
        where : {
            id : id
        },
        attributes : {
            exclude : ['author']
        }
    });
    res.send(book);
}

const insertBook = async(req, res)=>{
    let info = req.body;
    const book = await Book.create(info).catch((err)=>console.log(err));
    res.status(201).send(book);
}

module.exports = {selectBook, insertBook};