const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false})); // x-www-form-urlencoded

const User = require('./User');

// Create User
router.post('/', (req,res)=>{
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    (err, user)=>{
        if(err) return res.status(500).send('failed to create user');
        res.status(200).send(user);
    });
});

// Find all user
router.get('/', (req,res)=>{
    User.find({}, (err, users)=>{
        if(err) return res.status(500).send("failed to find all Users");
        res.status(200).send(users);
    });
});

// Find user
router.get('/:id', (req,res)=>{
    User.findById(req.params.id, (err, user)=>{
        if (err) return res.status(500).send("Failed to Find User ",req.params.id);
        if (!user) return res.status(404).send("No User to find");
        res.status(200).send(user);
    });
});

// Update user
router.put('/:id', (req,res)=>{
    User.findByIdAndUpdate(req.params.id,req.body,{new:true},
    (err, user)=>{
        if(err) return res.status(500).send('Failed to update User ', req.params.id);
        res.status(200).send(user);
    });
});

// Remove user
router.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id, (err, user)=>{
        if(err) return res.status(500).send('Failed to Remove User ',req.params.id);
        res.status(200).send("User "+ user.name +" removed!");
    });
});

module.exports = router;