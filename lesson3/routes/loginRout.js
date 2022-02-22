const { Router } = require('express');
const users= require('../dbUsers/users');

const loginRout = Router();

loginRout.get('/', (req, res) => {
    res.render('login');
});

loginRout.post('/', (req, res)=>{
    const someUser = users.some(user => user.email === req.body.email);
    if(someUser){
        res.render('err');
    }else{
        users.push({ ...req.body, id: users.length ? users[users.length - 1].id + 1 : 1 });
        res.redirect('/users')
    }

});