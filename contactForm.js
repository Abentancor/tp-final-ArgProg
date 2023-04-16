const service_id = "service_bw1kifm"
const template_id = "template_51canpf"
const public_key = "P7XIKHm70FW4V-piM"


$(document).ready(function() {
    $("#formulario").submit(function(event) {
        event.preventDefault();

        var reglasValidacion = {
            nombre: {
                presence: true
            },
            apellido: {
                presence: true
            },
            email: {
                presence: true,
                email: {
                    message: "Debe ingresar un correo electrónico válido"
                }
            },
            direccion: {
                presence: true
            },
            telefono: {
                presence: true,
                format: {
                    pattern: "[0-9]+(-[0-9]+)+",
                    message: "Ingrese un número de teléfono válido (0000-000000)"
                }
            },
            mensaje: {
                presence: true
            }
        };

        var valoresCampos = {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            direccion: $("#direccion").val(),
            email: $("#email").val(),
            telefono: $("#telefono").val(),
            mensaje: $("#consulta").val()
        };

        var errores = validate(valoresCampos, reglasValidacion);

        if (errores) {
            if (errores.nombre) {
                $("#error_nombre").html(errores.nombre[0]);
            } else {
                $("#error_nombre").html("");
            }
            if (errores.apellido) {
                $("#error_apellido").html(errores.apellido[0]);
            } else {
                $("#error_apellido").html("");
            }
            if (errores.direccion) {
                $("#error_direccion").html(errores.direccion[0]);
            } else {
                $("#error_direccion").html("");
            }

            if (errores.email) {
                $("#error_email").html(errores.email[0]);
            } else {
                $("#error_email").html("");
            }

            if (errores.telefono) {
                $("#error_telefono").html(errores.telefono[0]);
            } else {
                $("#error_telefono").html("");
            }

            if (errores.mensaje) {
                $("#mensaje").html(errores.mensaje[0]);
            } else {
                $("#mensaje").html("");
            }
        } else {
            enviarFormulario(valoresCampos);
            mostrarModalExito();
            return false;
        }
    });
});

var consulta_id = Date.now().toString();

function enviarFormulario(valoresCampos) {
    emailjs.init(public_key);
    var template_params = {
        "nombre": valoresCampos.nombre,
        "apellido": valoresCampos.apellido,
        "email": valoresCampos.email,
        "direccion": valoresCampos.direccion,
        "telefono": valoresCampos.telefono,
        "mensaje": valoresCampos.mensaje,
        "consulta_id": consulta_id
    };
    emailjs.send(service_id, template_id, template_params);
    console.log('mensaje enviado')
}

function mostrarModalExito() {
    $('.modal').removeClass('hidden');
    setTimeout(function() {
        $('.modal').addClass('hidden');
        $('form')[0].reset();
    }, 20000);
}

function ocultarModalExito() {
    $('.modal').addClass('hidden');
}

$('.modal-overlay').click(function() {
    ocultarModalExito();
});

$('.modal-close').click(function() {
    ocultarModalExito();
});



$("#generar_pdf").click(function() {

    var data = {
      hora: new Date().toLocaleTimeString(),
      id_consulta: consulta_id
    };
    
    var docDefinition = {
      content: [
        { text: 'Consulta', style: 'header' },
        { text: 'Hora: ' + data.hora },
        { text: 'ID consulta: ' + data.id_consulta }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    
    pdfMake.createPdf(docDefinition).download('consulta_' + consulta_id + '.pdf');
  });