"use strict";
const pug = require('pug');
const path = require('path');
const list = require('../list');
const compiledPug = pug.compileFile(require.resolve('./home.pug'));

module.exports = (dirname, response) => {
    let dirList = dirname.split('/').filter(dir => dir),
        dirPath = "";
    const promiseArray = [];
    dirList.unshift('/');
    dirList = dirList.map((dir, i) => {
        dirPath = i > 1 ? path.join(dirPath, dir) : path.join(dirPath, '/', dir);
        promiseArray.push(list({
            dirname: dirPath
        })); 
        return dirPath;
    });

    promiseArray.push(list({
        dirname: dirPath,
        includeFiles: "true"
    }));

    Promise.all(promiseArray).then(obj => {
        const final = {};
        for (let i = 0; i < obj.length - 1; i++) {
            final[dirList[i]] = obj[i];
        }
        response.setHeader('Content-Type', 'text/html');
        response.end(compiledPug({
            final: final,
            previewPanel: obj[obj.length - 1]
        }));
    }).catch(
        err => console.log(err)
    );
};
