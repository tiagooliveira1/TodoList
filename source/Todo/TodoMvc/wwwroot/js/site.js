$(document).ready(function(){
    $('#add-item-button').on('click', addItems);

    $('.done-checkbox')
        .on('click', function (event) {
            markCompleted(event.target);
        });
            
});

function markCompleted(checkbox) {
    checkbox.disabled = true;
    var data = { id: checkbox.name };
    $.post('/Todo/MarkDone', data, function () {
        var row = checkbox  // a partir do checkbox
            .parentElement  // acessamos a td
            .parentElement; // acessamos a tr
        $(row).addClass('done');
    });
}

function addItems() {
    $('#add-item-error').hide();
    var newTitle = $('#add-item-title').val();
    var newDate = $('#add-item-date').val();

    var data = {
        title: newTitle,
        dueAt: newDate
    };

    $.post("todo/AddItem",data, function() {
        window.location = '/todo';
    }).fail(function(err) {
        if(err && err.responseJSON) {
            var firstError = err.responseJSON[Object.keys(err.responseJSON)[0]];
            $('#add-item-error').text(firstError).show();
        }
    });
}