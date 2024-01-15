const express = require('express');
const router = express.Router();
const user = require('../models/homeSchema')

const auth=(req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.redirect('/admin')
    }
}

router.get('/',auth,(req,res)=> {
    res.render('adduser',{error:""})
})

router.post('/',auth,async(req,res)=> {
    try {
    req.session.admin = true
    console.log('Newly added data by admin :',req.body)
    const {name,email,password} =  req.body
    const userExist = await user.findOne({email:email})
    if(userExist){
        res.render('adduser',{error:"The entered email is an already a user"})
    }else{
    const addUser = new user({name:name , email:email , password:password})
    await addUser.save()
    res.redirect('/admin')  
    }
    
    
    } catch (error) {
        console.log('ERROR OCCUR WHILE ADMIN ADD USER',error)
    }
    
})


module.exports = router