"use strict";
const fs = require('fs');
const path = require('path');
const mime = require('mime');
module.exports = (request, response) => {
    const filePath = request.url.replace(/^.*?\/static\//, '');
    const rStream = fs.createReadStream(path.join(__dirname, '../static', filePath));
    rStream.on('error', err => {
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(404);
        response.end(err.toString());
    });

    response.setHeader('Content-Type', mime.lookup(filePath));
    rStream.pipe(response);
};
