"use strict";
const $ = require('jquery');
$(() => {
    $(document).on('click', '[data-path]>a', e => {
        e.preventDefault();
    });
    require('./history').init();
    require('./collapseFolder').init();
    require('./previewFolder').init();
    require('./expandFolder').init();
});

