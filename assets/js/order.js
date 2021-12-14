const api = 'http://localhost:8080/api/order';

$(document).ready(function () {
    bienvenida();
});

function bienvenida() {
    const dataUser = JSON.parse(sessionStorage.getItem('user'));
    console.log(dataUser);
    $('#mensaje').html('<strong> Bienvenido Señor@' + dataUser.name +'</strong>');

    tablaOrdenes();
}

function tablaOrdenes() {
    $.ajax({
        url: api + '/all',
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var valor = '';
            for (i = 0; i < response.length; i++) {
                valor += '<tr>' +
                    '<td>' + response[i].id + '</td>' +
                    '<td>' + response[i].identification + '</td>' +
                    '<td>' + response[i].name + '</td>' +
                    '<td>' + response[i].birthtDay + '</td>' +
                    '<td>' + response[i].monthBirthtDay + '</td>' +
                    '<td>' + response[i].address + '</td>' +
                    '<td>' + response[i].cellPhone + '</td>' +
                    '<td>' + response[i].email + '</td>' +
                    '<td>' + response[i].zone + '</td>' +
                    '<td>' + response[i].type + '</td>' +
                    '<td><button onclick="eliminar(' + response[i].id + ')" class="btn btn-danger">Borrar</button>' +
                    '<button data-bs-toggle="modal" data-bs-target="#modelId" onclick="editar(' + response[i].id + ')" class="btn btn-warning">Editar</button></td>' +
                    '</tr>';
            }
            $('#tbody').html(valor);
        }
    });
}

function eliminar(id) {
    var bool = confirm("Seguro de eliminar el registro?");
    if (bool) {
        $.ajax({
            url: api + '/' + id,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                alert("se elimino correctamente");
                tablaOrdenes();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error');
            }
        });        
    } 
}

function editar(id) {
    $.ajax({
        url: api + '/' + id,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
           
            $("#identification").val(response.identification);
            $("#name").val(response.name);
            $('#birthtDay').val(getDevolutionDate(response.birthtDay));
            $("#address").val(response.address);
            $("#cellPhone").val(response.cellPhone);
            $("#email").val(response.email);
            $("#password").val(response.password);
            $("#password2").val(response.password);
            $("#zone").val(response.zone);
            $("#type").val(response.type);

            let valor = '<input class="btn form-control btn btn-warning" data-bs-dismiss="modal"  id="botonActualizar" type="submit" value="Actualizar" onclick="update(' + id + ')">';
            $('#botonFormulario').html(valor);
            $("#botonRegistrar").remove();
        }
    });
}

function getDevolutionDate(devolutionDate) {
    var d = new Date(devolutionDate);

    var month = d.getMonth() + 1;
    var day = d.getDate() + 1;

    var date = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

    return date;
}

function update(idUsuario) {
    var dataForm = {
        id: idUsuario,
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
        url: api + '/update',
        type: 'PUT',
        data: dataJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            alert('Usuario: ' + response.name + ' actualizazdo');
            limpiarFormulario();
            tablaOrdenes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error al actualizar');
        }
    });
    let valor = '<input class="btn form-control btn btn-success"  id="botonRegistrar" type="submit" value="Registrar" onclick="validarFormulario()">';
    $('#botonFormulario').html(valor);
    $("#botonActualizar").remove();
}

function limpiarFormulario() {
    $('#formularioRegistro')[0].reset();
}

function cerraSesion() {
    sessionStorage.clear();
    window.location.href = "../../index.html";
}