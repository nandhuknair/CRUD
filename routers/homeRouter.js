const express = require('express');
const router = express.Router()

const auth =(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/login')
    }
}

router.get('/',auth,(req,res)=> {
    res.render('home',{title : 'home'})
})

module.exports = router