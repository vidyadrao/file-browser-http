"use strict";
const $ = require('jquery');
module.exports.init = function() {
    $(document).on('click','li.expanded>a' , e => {
        $(e.target).parent('li').removeClass("expanded").find('ul').remove();
        e.stopImmediatePropagation();
    });

}