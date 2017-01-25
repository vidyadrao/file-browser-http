"use strict";
const $ = require('jquery');
const listpug = require('../templates/treeList.pug');
module.exports.init = () => {
    $(document).on('click','li:not(".expanded")>a',e => {
        module.exports.loadTree($(e.target).parent('li').data('path'));
        e.stopImmediatePropagation();
    });
}

module.exports.loadTree = (path) => {
    $.getJSON("/api/get", {dirname: path}, (data) => {
        if(data.length === 0){
            $("li[data-path='"+path+"']").addClass('empty');
            return;
        }
        $("li[data-path='"+path+"']>ul").remove();
        $("li[data-path='"+path+"']").addClass('expanded').append(listpug({array: data,full:[]}));

    });
}