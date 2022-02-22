const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'hbs');
app.engine('hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [];

app.get('/signIn', (req, res)=> {
    res.render('signIn');
})

app.post('/signIn', ({ body }, res) => {
    const user = users.find(user =>  user.email === body.email && user.password === body.password);
    if (user) {
        res.redirect(`/users/${user.id}`);

    }else{
        res.redirect('/error');
        return;
    }

});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res)=>{
    const someUser = users.some(user => user.email === req.body.email);
    if(someUser){
        res.render('err');
    }else{
        users.push({ ...req.body, id: users.length ? users[users.length - 1].id + 1 : 1 });
        res.redirect('/users')
    }

})

app.get('/users', ({query}, res) => {
    for (let i in query){
        let usersArray = [...users];
        if(query.city){
            usersArray = usersArray.filter(user => user.city === query.city)
        }
        if(query.age){
            usersArray = usersArray.filter(user => user.age === query.age)
        }
        res.render('users', {users: usersArray});
        return;
    }
    res.render('users', { users });
});


app.get('/users/:userId', ({ params }, res) => {
    const user = users.find(user => user.id === +params.userId);
    if (!user) {
        res.redirect('/error');
        return;
    }

    res.render('user', { user });
});





app.use((req, res) => {
    res.render('err');
})



app.listen(5200, () =>{
    console.log('port 5200 get started');
})