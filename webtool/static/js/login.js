function fn_btn(status) {
    if (status == 'login') {
        var username = document.getElementById('ca').value;
        var pa = document.getElementById('pa').value;

    } else if (status == 'clear') {
        $('.input_acpa').val('')
    }

}

function register() {
    window.location.assign = 'http://127.0.0.1:8000/register/';
}