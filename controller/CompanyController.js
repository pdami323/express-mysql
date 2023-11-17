const db = require('../models');
const Company = db.Company;

const insertCompany = async(req, res)=>{
    let info = {
        name : req.body.name,
        desc : req.body.desc
    };

    try{
        const company = await Company.create(info).catch((err)=>console.log(err));
        res.status(201).send(company);
    }catch(err){
        console.error(err);
        next(err);
    }
}

const updateCompany = async(req, res)=>{
    try{
        const id = req.params.id;
        const result = await Company.update(req.body, {
            where : {id : id}
        }).catch((err)=>console.log(err));
        res.status(201).send(result);
    }catch(err){
        console.error(err);
    }
}

const selectCompany = async(req, res)=>{
    try{
        const id = req.params.id;
        const company = await Company.findOne({
            where : {id : id}
        }).catch((err)=>console.log(err));
        res.status(201).send(company);
    }catch(err){
        console.error(err);
    }
}

module.exports = {insertCompany, updateCompany, selectCompany};