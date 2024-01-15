const express = require('express');
const router = express.Router();
const User = require('../models/homeSchema');

const auth = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/adminlogin');
    }
};

router.get('/:id', auth, async (req, res) => {
    try {
        const findedData = await User.findById(req.params.id);
        res.render('edit', { message: findedData, id: req.params.id, error: '' });
    } catch (error) {
        console.log("Error while clicking the edit button", error);
        res.status(500).send('Error occurred while fetching user data');
    }
});

router.post('/:id', auth, async (req, res) => {
    console.log("The body of edited user is =", req.body);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser && existingUser._id.toString() !== req.params.id) {
            return res.render('edit', { 
                message: existingUser, 
                id: req.params.id, 
                error: "The email you entered is already in use by another user." 
            });
        }
        
        const editedData = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, { new: true });

        res.redirect('/admin');
    } catch (error) {
        console.log("Error occurred while editing the data ", error);
        res.render('edit', { 
            message: "", 
            id: req.params.id, 
            error: "Error occurred while updating the user data." 
        });
    }
});

router.get('/:id/delete',auth,async(req,res)=> {
    try {
        await User.findByIdAndDelete({_id:req.params.id})
        res.redirect('/admin')
    } catch (error) {
        console.log("An error Rised while deleting the data :",error);
    }
    

})
module.exports = router;
