"use strict";
const mime = require('mime');
const promises = require('../promises/fs');
const tar = require('tar-fs');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

module.exports = ({
    name
}, response) => {
    promises.lstat(name).then(({
        stat,
        fileName
    }) => {
        if (stat.isDirectory()) {
            const gzip = zlib.createGzip();
            const readableStream = tar.pack(fileName);
            response.setHeader('Content-Disposition', `attachment; filename="${path.basename(fileName)}.tar.gz"`);
            readableStream.pipe(gzip).pipe(response);
        } else if (stat.isFile()) {
            response.setHeader('Content-Disposition', `attachment; filename="${path.basename(fileName)}"`);
            response.setHeader('Content-Type', mime.lookup(fileName));
            (fs.createReadStream(fileName)).pipe(response);
        }
    }).catch(err => {
        console.log('err');
        response.writeHead(500);
        response.end(err.toString());
    });
};
