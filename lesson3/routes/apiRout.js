const { Router } = require('express');
const userRout = require('./userRout');
const userLogin = require('./loginRout');
const signInRout = require('./signInRout');

const routes = Router();

routes.use('/users', userRout);
routes.use('/login', userLogin);
routes.use('/signIn', signInRout);


module.exports = routes;