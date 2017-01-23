"use strict";
const path = require('path');
const promises = require('../promises/fs');

module.exports = ({ dirname, includeFiles }) =>
    promises.lstat(dirname).then(data => {
        if (data.stat.isDirectory()) {
            return promises.readDir(dirname);
        }
        throw new Error('1. Not a directory');
    }).then(listOfFiles =>
        Promise.all(listOfFiles.map(file => promises.lstat(file)))
    ).then(data => {
        const arr = [];
        for (const {
                stat,
                fileName
            } of data) {
            if (stat.isDirectory()) {
                arr.push({
                    fileName: path.basename(fileName),
                    path: fileName
                });
            } else if (stat.isFile() && includeFiles === "true") {
                arr.push({
                    fileName: path.basename(fileName),
                    path: fileName,
                    isFile: true
                });
            }
        }
        return arr;
    });
