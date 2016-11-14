$(document).ready(function() {
    var socket = io.connect();
    
    socket.on('Welcome', function(data){
        $('#log').append('<div><strong>' + data.text + '</strong></div>');
    });
    var name;
    $('#user-save').click(function(){
        console.log('click');
        var username = $('#user-name');
        var txt = username.val().trim();
        console.log(txt);
        if(txt.length > 0) {
            name = txt;
            username.prop('disabled', true);
            $(this).hide();
            $('#controls').show();
            $('#message').prop('disabled', false);
            $('#send').prop('disabled', false);
            socket.emit('user', name);
        }
    })
    socket.on('message', function(data){
        $('#log').append('<div><strong>' + data.user + ': ' + data.message + '</strong></div>');
    });
    
    $('#send').click(function(){
        var input = $('#message');
        var text = input.val().trim();
        if(text.length > 0) {
            socket.emit('message', text);
        }
        input.val('');
    })
    socket.on('otherUserConnect', function(data) {
        $('#log').append('<div><strong>' + data + ' connected</strong></div>');
    });
    socket.on('otherUserDisonnect', function(data) {
        $('#log').append('<div><strong>' + data + ' disconnected</strong></div>');
    });
});
