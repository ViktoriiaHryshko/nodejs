const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = './hw1/task2/csv/nodejs-hw1-ex1.csv';
const jsonFilePath = './hw1/task2/json/nodejs-hw1-task2.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(jsonFilePath);

const onError = error => console.log(`ERROR! ${error}`);

readStream.on('error', onError);
writeStream.on('error', onError);

readStream.pipe(csv()).pipe(writeStream);

