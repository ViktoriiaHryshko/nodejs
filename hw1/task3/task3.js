import csv from "csvtojson";
import fs from "fs";

const csvFilePath = './hw1/task3/csv/nodejs-hw1-ex1.csv';
const jsonFilePath = './hw1/task3/json/nodejs-hw1-task2.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(jsonFilePath);

const onError = error => console.log(`ERROR! ${error}`);

readStream.pipe(csv())
    .on('data', data => {
        writeStream.write(data);
    })
    .on('error', onError);
