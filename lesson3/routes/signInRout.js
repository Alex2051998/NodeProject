const {Router} = require('express');
const users= require('../dbUsers/users');

const signInRout = Router();

signInRout.get('/', (req, res)=> {
    res.render('signIn');
});

signInRout.post('/', ({ body }, res) => {
    const user = users.some(user =>  user.email === body.email && user.password === body.password);
    if (!user) {
        res.redirect('/error');
        return;
    }
    res.redirect(`/users/${user.id}`);


});
