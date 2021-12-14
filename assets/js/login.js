const api = 'http://localhost:8080/api/user';

let email;
let password;
let mensaje = '';

$("#formularioLogin").on("click", function (event) {
    event.preventDefault();
});

// Validar formulario de login
function validarFormulario() {
    if (validarDatos()) {
        loginUsuario();// Login usuario
    } else {  
        mostrarMensaje();//Mostrar mensaje de alerta        
    }
}

// Mostrar alertas en el formulario
function mostrarMensaje() {
    $('#alertaMensaje').removeClass("ocultar");
    $('#alertaMensaje').addClass("mostrar");

    $('#mensaje').html('<strong>' + mensaje + '</strong>');
}

function validarDatos() {
    email = $('#email').val();
    password = $('#password').val();

    // validar datos vacios
    if (email == '') {
        mensaje = 'Correo es requerido';
        return false;
    }
    if (password == '') {
        mensaje = 'Contraseña es requerida';
        return false;
    }

    // validar expressions 
    let emailV = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailV.test(email)) {
        mensaje = 'Correo incorrecto';
        return false;
    }
    return true;
}

// login de usuario
function loginUsuario() {

    $.ajax({
        url: api + '/' + email + '/' + password,
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            if (response.id != null) {
                sessionStorage.setItem('user', JSON.stringify(response));

                if (response.type === "COORD") { // Admin crea usuarios - agrega productos - acepta pedidos(orden)
                    window.location.href = "../../usuario/usuario.html"; 
                }
                if (response.type === "ASE") { // Realiza pedidos(orden)
                    window.location.href = "../../usuario/asesor.html"; 
                }
                
            } else {
                mensaje = 'Incorrect username or password.';
                mostrarMensaje();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error login');
        }
    });
}

