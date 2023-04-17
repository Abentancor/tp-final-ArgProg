const service_id = "service_bw1kifm"
const template_id = "template_51canpf"
const public_key = "P7XIKHm70FW4V-piM"


$(document).ready(function() {
    $("#formulario").submit(function(event) {
        event.preventDefault();

        var reglasValidacion = {
            nombre: {
                presence: {
                    message: "El campo Nombre es requerido"
                }
            },
            apellido: {
                presence: {
                    message: "El campo Apellido es requerido"
                }
            },
            direccion: {
                presence: {
                    message: "El campo Dirección es requerido"
                }
            },
            email: {
                presence: {
                    message: "El campo Email es requerido"
                },
                email: {
                    message: "Debe ingresar un correo electrónico válido"
                }
            },
            telefono: {
                presence: {
                    message: "El campo Teléfono es requerido"
                },
                format: {
                    pattern: "[0-9]+([0-9]+)+",
                    message: "Ingrese un número de teléfono válido (0000-000000)"
                }
            },
            mensaje: {
                presence: false
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
            $("#error_nombre").html(errores.nombre ? errores.nombre[0] : "");
            $("#error_apellido").html(errores.apellido ? errores.apellido[0] : "");
            $("#error_direccion").html(errores.direccion ? errores.direccion[0] : "");
            $("#error_email").html(errores.email ? errores.email[0] : "");
            $("#error_telefono").html(errores.telefono ? errores.telefono[0] : "");
            $("#mensaje").html(errores.mensaje ? errores.mensaje[0] : "");
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