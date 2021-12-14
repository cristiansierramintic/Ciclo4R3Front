const api = 'http://localhost:8080/api/clone';

let mensaje = '';

$(document).ready(function () {
    tablaProductos();
});

function tablaProductos() {
    $.ajax({
        url: api + '/all',
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var valor = '';
            for (i = 0; i < response.length; i++) {
                valor += '<tr>' +
                    '<td>' + response[i].id + '</td>' +
                    '<td>' + response[i].brand + '</td>' +
                    '<td>' + response[i].procesor + '</td>' +
                    '<td>' + response[i].os + '</td>' +
                    '<td>' + response[i].description + '</td>' +
                    '<td>' + response[i].memory + '</td>' +
                    '<td>' + response[i].hardDrive + '</td>' +
                    '<td>' + response[i].price + '</td>' +
                    '<td>' + response[i].quantity + '</td>' +
                    '<td>' + response[i].photography + '</td>' +
                    '<td><button onclick="eliminar(' + response[i].id + ')" class="btn btn-danger">Borrar</button>' +
                    '<button data-bs-toggle="modal" data-bs-target="#modelId" onclick="editar(' + response[i].id + ')" class="btn btn-warning">Editar</button></td>' +
                    '</tr>';
            }
            $('#tbody').html(valor);
        }
    });
}


$("#formularioProducto").on("click", function (event) {
    event.preventDefault();
});

// validar datos del formulario
function validarFormulario() {
    if (validarDatos()) {
        registrarProducto(); // registrar producto
    } else {
        $('#alerta').html('<p id="mensaje">' + mensaje + '</p>'); //Mostrar alerta
    }
}

// Validar formulario
function validarDatos() {

    let idProducto = $('#id').val();
    let marca = $('#brand').val();
    let procesor = $('#procesor').val();
    let os = $('#os').val();
    let descripcion = $('#description').val();
    let memoria = $('#memory').val();
    let hardDrive = $('#hardDrive').val();
    let precio = $('#price').val();
    let cantidad = $('#quantity').val();
    let foto = $('#photography').val();

    // validar campos vacios   
    if (idProducto == '') {
        mensaje = 'Id producto es requerido ';
        return false;
    }
    if (cantidad == '') {
        mensaje = 'Cantidad es requerido ';
        return false;
    }
    if (marca == '') {
        mensaje = 'Marca es requerido ';
        return false;
    }
    if (procesor == '') {
        mensaje = 'Procesador es requerido ';
        return false;
    }
    if (os == '') {
        mensaje = 'OS es requerido ';
        return false;
    }
    if (memoria == '') {
        mensaje = 'Memoria es requerido';
        return false;
    }
    if (descripcion == '') {
        mensaje = 'Descripción es requerido';
        return false;
    }
    if (hardDrive == '') {
        mensaje = 'Disco duro es requerida';
        return false;
    }
    if (precio == '') {
        mensaje = 'Precio es requerido';
        return false;
    }
    if (foto == '') {
        mensaje = 'Fotografia es requerido ';
        return false;
    }
    return true;
}

// Agregar nuevo producto
function registrarProducto() {
    var dataForm = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        procesor: $("#procesor").val(),
        os: $("#os").val(),
        description: $("#description").val(),
        memory: $("#memory").val(),
        hardDrive: $("#hardDrive").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    };

    var dataJson = JSON.stringify(dataForm);

    $.ajax({
        url: api + '/new',
        type: 'POST',
        data: dataJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            alert('producto registrado');
            limpiarFormulario();
            $('#modelId').modal('hide');
            tablaProductos();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('El memoria se encuentra registrado');
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
                tablaProductos();
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
            $("#id").val(response.id);
            $("#brand").val(response.brand);
            $("#procesor").val(response.procesor);
            $("#os").val(response.os);
            $("#description").val(response.description);
            $("#memory").val(response.memory);
            $("#hardDrive").val(response.hardDrive);
            $("#price").val(response.price);
            $("#quantity").val(response.quantity);
            $("#photography").val(response.photography);

            let valor = '<input class="btn form-control btn btn-warning" data-bs-dismiss="modal"  id="botonActualizar" type="submit" value="Actualizar" onclick="update(' + id + ')">';
            $('#botonFormulario').html(valor);
            $("#botonRegistrar").remove();
        }
    });
}

function update(idUsuario) {
    var dataForm = {
        id: idUsuario,
        brand: $("#brand").val(),
        procesor: $("#procesor").val(),
        os: $("#os").val(),
        description: $("#description").val(),
        memory: $("#memory").val(),
        hardDrive: $("#hardDrive").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    };

    var dataJson = JSON.stringify(dataForm);

    $.ajax({
        url: api + '/update',
        type: 'PUT',
        data: dataJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            alert('Producto: ' + response.brand + ' actualizazdo');
            limpiarFormulario();
            tablaProductos();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error al actualizar');
        }
    });
    
}

function limpiarFormulario() {
    $('#formularioProducto')[0].reset();

    let valor = '<input class="btn form-control btn btn-success"  id="botonRegistrar" type="submit" value="Registrar" onclick="validarFormulario()">';
    $('#botonFormulario').html(valor);
    $("#botonActualizar").remove();
}
