const path = require('path');
const fs = require('fs');

path.join()

// fs.mkdir(path.join(__dirname, 'main'), (err) => {
//     if(err){
//         console.log(err)
//     }
// })

// fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
//     if(err){
//         console.log(err)
//     }
// })
//
// fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, (err) => {
//     if(err){
//         console.log(err)
//     }
// })



const inPersonUsers = [
    {name: "Max", age: 12, city: "Tachiv" },
    {name: "Misha", age: 20, city: "Tachiv" },
    {name: "Sergi", age: 29, city: "Tachiv" }
];

const onlineUsers = [
    {name: "Andri", age: 22, city: "Lviv" },
    {name: "Loha", age: 20, city: "Lviv" },
    {name: "Artem", age: 32, city: "Lviv" }
];




let nameInPersonUsers;
for (let i of inPersonUsers){
    nameInPersonUsers = i.name;
    fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'file.txt'),`\nName: ${nameInPersonUsers}`, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log(nameInPersonUsers);
        }
    })

}


let nameOnlineUsers;


for (let i of onlineUsers){
    nameOnlineUsers = i.name;
    fs.writeFile(path.join(__dirname, 'main', 'online', 'file.txt'),`\nName: ${nameOnlineUsers}`, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log(nameOnlineUsers);
        }
    })
}

function reset() {

    fs.truncate(path.join(__dirname, 'main', 'inPerson', 'file.txt'), (err) => {
        if(err){
            console.log(err);
        }
    })
    let nameInPersonUsers;
    for (let i of onlineUsers){
        nameInPersonUsers = i.name;
        fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'file.txt'),`\nName: ${nameInPersonUsers}`, (err) => {
            if(err){
                console.log(err);
            }else{
                console.log(nameInPersonUsers);
            }
        })

    }

    fs.truncate(path.join(__dirname, 'main', 'online', 'file.txt'), (err) => {
        if(err){
            console.log(err);
        }
    })

    let nameOnlineUsers;

    for (let i of inPersonUsers){
        nameOnlineUsers = i.name;
        fs.appendFile(path.join(__dirname, 'main', 'online', 'file.txt'),`\nName: ${nameOnlineUsers}`,  (err) => {
            if(err){
                console.log(err);
            }else{
                console.log(nameOnlineUsers);
            }
        })
    }
}

reset();

