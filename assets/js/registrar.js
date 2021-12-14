
let mensaje = '';

$("#formularioRegistro").on("click", function (event) {
    event.preventDefault();
});

// validar datos del formulario
function validarFormulario() {
    if (validarDatos()) {
        registrarUsuario(); // registrar usuario
    } else {
        $('#alerta').html('<p id="mensaje">' + mensaje + '</p>'); //Mostrar alerta
    }
}

// Validar formulario
function validarDatos() {

    let identificacion = $('#identification').val();
    let nombreUsuario = $('#name').val();
    let direccion = $('#direction').val();
    let telefono = $('#cellPhone').val();
    let correo = $('#email').val();
    let clave = $('#password').val();
    let confirmarClave = $('#password2').val();
    let zona = $('#zone').val();
    let tipoUsuario = $('#type').val();

    if (tipoUsuario == '') {
        mensaje = 'Tipo Usuario es requerido ';
        return false;
    }
    if (zona == '') {
        mensaje = 'Zona es requerido ';
        return false;
    }
    if (identificacion == '') {
        mensaje = 'Identificación es requerido ';
        return false;
    }
    if (nombreUsuario == '') {
        mensaje = 'Nombre es requerido ';
        return false;
    }
    if (direccion == '') {
        mensaje = 'Dirección es requerido ';
        return false;
    }
    if (correo == '') {
        mensaje = 'Correo es requerido';
        return false;
    }
    if (telefono == '') {
        mensaje = 'Teléfono es requerido';
        return false;
    }
    if (clave == '') {
        mensaje = 'Contraseña es requerida';
        return false;
    }
    if (confirmarClave == '') {
        mensaje = 'Confirmar contraseña';
        return false;
    }

    // Expresiones
    let correoV = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let claveV = /^.{4,25}$/;
    // validar expresiones
    if (!correoV.test(correo)) {
        mensaje = 'Correo incorrecto';
        return false;
    }
    if (!claveV.test(clave)) {
        mensaje = 'Contraseña entre 4 y 25 caracteres';
        return false;
    }
    // confirmación de contraseña
    if (clave != confirmarClave) {
        mensaje = 'La contraseña no coincide';
        return false;
    }

    return true;
}

function getDevolutionMonthDate(devolutionDate) {
    var d = new Date(devolutionDate);
   
    var month = d.getMonth() + 1;
    var date = (month < 10 ? '0' : '') + month;
    return date;
}

// Agregar nuevo usuario
function registrarUsuario() {
    console.log('Registro');
    var dataForm = {
        identification : $("#identification").val(),
        name : $("#name").val(),
        birthtDay : $("#birthtDay").val(),
        monthBirthtDay : getDevolutionMonthDate($("#birthtDay").val()),
        address : $("#address").val(),
        cellPhone : $("#cellPhone").val(),
        email : $("#email").val(),
        password : $("#password").val(),
        zone : $("#zone").val(),
        type : $("#type").val()
    };
    
    var dataJson = JSON.stringify(dataForm);
    
    $.ajax({
        url: api + '/new',
        type: 'POST',
        data: dataJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            alert('Usuario registrado');
            limpiarFormulario();
            $('#modelId').modal('hide');
            tablaUsuarios();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('El correo se encuentra registrado');
        }
    });

}
