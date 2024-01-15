const express = require('express');
const router = express.Router()
const homeSchema = require('../models/homeSchema')

const auth =(req,res,next)=> {
    if(req.session.user){
        res.redirect('/home')
    }else{
        next()
    }
}
router.get('/',auth,(req,res)=> {
    res.render('signup',{ error:"" })
})

router.post('/',async(req,res)=> {
    console.log("Entered signup email and password is : ",req.body)
    try {
        const {name, email , password} = req.body
        const userExist = await homeSchema.findOne({email:email})
        if(userExist){
            res.render('signup', { error: 'User already exist try another email '})
        }else{
            const userData = new homeSchema({name, email , password})
            await userData.save()
            req.session.user = userData
            console.log("Data successfully added to the collection")
            res.redirect('/login')     
        }
        
    } catch (error) {
        console.error('Error while inserting data to the collection:', error);
        res.render('signup', { error: 'Error saving user data'});
    }
  })

module.exports = router