"use strict";
const $ = require('jquery');
const stateObj = { file: "path" };
module.exports.init = function() {
    window.onpopstate = function() {
        require('./previewFolder').loadPreview(document.location.pathname);
        require('./expandFolder').loadTree(document.location.pathname);
    };
    $(document).on(
        'click', 'li>span', e => {
            history.pushState(stateObj, "fileState", $(e.target).parent('li').data('path'));
        }
    );
};
