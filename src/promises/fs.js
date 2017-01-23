"use strict";
const fs = require('fs');
//get the lstat for the file or directory
module.exports.lstat = fullFileName =>
    new Promise((resolve, reject) => {
        fs.lstat(fullFileName, (err, stat) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                "fileName": fullFileName,
                "stat": stat
            });
        });
    });


module.exports.readDir = fullPath =>
    new Promise((resolve, reject) => {
        fs.readdir(fullPath, (err, listOfFiles) => {
            if (err) {
                return reject(err);
            }
            return resolve(listOfFiles.map(fileName => require('path').join(fullPath, fileName)));
        });
    });
