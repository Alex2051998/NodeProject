const { Router } = require('express');
const users= require('../dbUsers/users');

const userRout = Router();

userRout.get('/', ({ query }, res) => {
    if (Object.keys(query).length) {
        let usersArray = [...users];
        if (query.city) {
            usersArray = usersArray.filter(user => user.city === query.city);
        }
        if (query.age) {
            usersArray = usersArray.filter(user => user.age === query.age);
        }

        res.render('users', { users: usersArray });
        return;
    }

    res.render('users', { users });
});

userRout.get('/:userId',({ params }, res) => {
    const user = users.find(user => user.id === +params.userId);
    if (!user) {
        res.redirect('/error');
        return;
    }

    res.render('user', { user });
});