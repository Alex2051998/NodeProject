const path = require('path');
const fs = require('fs');

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

// fs.mkdir(path.join(__dirname, 'main'), err => {
//     if (err) {
//         console.log(err);
//     }
// })
//
// fs.writeFile(path.join(__dirname, 'main', 'firstFile.txt'), 'Hello world!', (err => {
//     if (err) {
//         console.log(err);
//     }
//     fs.readFile(path.join(__dirname, 'main', 'firstFile.txt'), 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         fs.writeFile(path.join(__dirname, 'main', 'secondFile.txt'), `${data}`, (err => {
//                 if (err) {
//                     console.log(err);
//                 }
//             })
//         )
//     })
// }))

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell

// fs.mkdir(path.join(__dirname, 'someDirectory'), err => {
//     if (err) {
//         console.log(err);
//     }
// })
//
// fs.writeFile(path.join(__dirname, 'someDirectory', 'someFile.txt'), 'Hello Octen!', (err => {
//     if (err) {
//         console.log(err);
//     }
//     fs.readFile(path.join(__dirname, 'someDirectory', 'someFile.txt'), 'utf8', (err, data1) => {
//         if (err) {
//             console.log(err);
//         }
//         fs.mkdir(path.join(__dirname, 'someDirectory2'), err => {
//             if (err) {
//                 console.log(err);
//             }
//             fs.writeFile(path.join(__dirname, 'someDirectory2', 'someFile2.txt'), `${data1}`, (err => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 fs.truncate(path.join(__dirname, 'someDirectory', 'someFile.txt'), (err) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                 })
//             }))
//         })
//
//
//     })
// }))


// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new


// fs.mkdir(path.join(__dirname, 'Top100Directory'), err => {
//     if (err) {
//         console.log(err);
//     }
// })

for (let i = 0; i < 10; i++) {
    fs.mkdir(path.join(__dirname, 'Top100Directory', `papka${i}`), {recursive: true}, err => {
        if (err) {
            console.log(err);
        }
        fs.writeFile(path.join(__dirname, 'Top100Directory', `file${i + 1}`), `somedata${i + 2}`, (err => {
            if (err) {
                console.log(err);
            }

        }))
    })
}

function showMessage() {
    fs.readdir(path.join(__dirname, 'Top100Directory'), (err, data) => {
        if (err) {
            console.log(err);
        }
        for (let i of data){
            fs.stat(`${__dirname}/Top100Directory/${i}`,(err, stats)=>{
                if(stats.isFile() === true){
                    fs.truncate(path.join(__dirname, 'Top100Directory', `${i}`),(err => {
                        if (err) {
                            console.log(err);
                        }
                    }))
                }else if(stats.isDirectory() === true){
                    fs.rename(`${__dirname}/Top100Directory/${i}`, `${__dirname}/Top100Directory/new_${i}`, err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

            })
        }
        // console.log(stats.isFile());
        // console.log(stats.isDirectory());
        // console.log(stats.size);
    })
}




showMessage();