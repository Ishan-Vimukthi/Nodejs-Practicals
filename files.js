const fs = require('fs');

fs.readFile('./doc.txt', (err, data) =>{
    if (err){
        console.log(err);
    }
    console.log(data.toString());
});

fs.writeFile('./doc.txt', 'Hello, World', () => {
    console.log('File was written');
});

if(!fs.existsSync('./assets')){

fs.mkdir('./assets', (err) => {
    if (err){
        console.log(err);
    }
    console.log('Folder created');
});

}