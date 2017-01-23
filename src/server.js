"use strict";
const http = require('http');
const url = require('url');
const qString = require('querystring');

const server = http.createServer();
server.on('request', (request, response) => {
    const reqURL = url.parse(request.url);
    const qData = qString.parse(reqURL.query);
    if (reqURL.pathname === '/api/get') {
        require('./routes/list')(qData).then(childNodes => {
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify(childNodes));
            response.end();
        }).catch(err => {
            response.writeHead(500);
            response.end(err.toString());
        });
    } else if (reqURL.pathname === '/api/download') {
        require('./routes/download')(qData, response);
    } else if (reqURL.pathname.startsWith('/api/static/')) {
        require('./routes/getStaticData')(request, response);
    } else {
        require('./routes/home')(reqURL.pathname, response);
    }
});

server.listen(3333);
