const $ = require('jquery');
$(() => {
    $('li.expanded').on('click', e => {
        $(e.target).empty();
    });
});

