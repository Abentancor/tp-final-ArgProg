$(document).ready(function() {
    function calcularPrecioTotal() {
        var cantidadPaginas = parseInt($('#cantidad').val());
        var precioPagina = parseInt($('#precio-pagina').text().replace('$', ''));
        var precioPaginasTotal = precioPagina * cantidadPaginas;
        var precioFormulario = ($('#form').is(':checked') && cantidadPaginas >= 2) ? 0 : cantidadPaginas == 1 ? 2000 : 0;
        if (precioFormulario > 0) {
          precioPaginasTotal += precioFormulario;
        }
        var total = precioPaginasTotal;
        console.log('total', total)
        $('#precio_formulario').text('$' + precioFormulario);
        $('#precio_paginas_total').text('$' + precioPaginasTotal);
        $('#total').text('Total: $' + total);
      }
  
    function validarNombrePagina() {
        var constraints = {
            nombrePagina: {
                presence: true,
                length: {
                  minimum: 1,
                  message: "no puede estar vacío"
                },
                format: {
                  pattern: /^(www\.)?[a-zA-Z0-9]+(\.[a-zA-Z]{2,3}){1,2}$/,
                  message: "debe ser una dirección web válida"
                }
              }
        };
      
        var formData = {
          nombrePagina: $('#nombre-pagina').val()
        };
      
        var errors = validate(formData, constraints);
      
        if (errors && errors.nombrePagina) {
          $('#erroresPagina').text(errors.nombrePagina[0]);
          return false;
        } else {
          $('#errores').text('');
          return true;
        }
      }
    
    $('#cantidad').on('input', function() {
      calcularPrecioTotal();
    });
    
    $('#form').on('change', function() {
      calcularPrecioTotal();
    });  
  
    $('#nombre-pagina').on('blur', function() {
      validarNombrePagina();
    });
  
    $('#submit').on('click', function(event) {
        event.preventDefault();
        var nombrePaginaValido = validarNombrePagina();
        if (nombrePaginaValido) {
          var total = $('#total').text();
          alert('El precio total es: ' + total);
      
              var nombrePagina = $('#nombre-pagina').val();
              var cantidadPaginas = $('#cantidad').val();
              var formulario = $('#form:checked').val() || 'No';
              var total = $('#total').text();
            
              var docDefinition = {
                content: [
                  { text: 'Detalle de la Orden', style: 'header' },
                  { text: 'Nombre de la Página: ' + nombrePagina },
                  { text: 'Cantidad de Páginas: ' + cantidadPaginas },
                  { text: 'Formulario de Contacto: ' + formulario },
                  { text: 'Total: ' + total }
                ],
                styles: {
                  header: {
                    fontSize: 18,
                    bold: true
                  }
                }
              };
              
              pdfMake.createPdf(docDefinition).open();
            ;
        }
      });
  });
  