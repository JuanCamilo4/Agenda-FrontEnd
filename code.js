$(document).ready(function () {   
    let numeroTareas = 0;
    let tarea = {  //Variable que contiene los datos de la tarea
        'Nombre': $('#txtNombreTarea').val(), 
        'Descripcion': $('#txtDescripcionTarea').val(), 
        'Fecha': $('#txtFecha').val()
    };
    mostrarTarea();

    const hoy = moment();

    const formato = hoy.format('YYYY MMM dddd');
    console.log(formato)

    const fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();

    if (mes < 10) {
        $('#txtFechaTarea').attr('min', `${año}-0${mes}-${dia}`); 
        if (dia < 10) {
            $('#txtFechaTarea').attr('min', `${año}-0${mes}-0${dia}`);
        }   
    } else if (dia < 10) {
        $('#txtFechaTarea').attr('min', `${año}-0${mes}-0${dia}`);
    }else {
        $('#txtFechaTarea').attr('min', `${año}-${mes}-${dia}`);
    }
    

    $('#btnGuardar').click(function (e) { 
        if ($('#txtNombreTarea').val() == "" || $('#txtFecha').val() == "") {
            alert("Todos los campos deben estar llenos para poder registrar la tarea");
        } else {

            /*if ($('#txtFecha').val() == ) {
                
            }*/
            for (let i in tarea) { //For para capturar los datos de los input en el array
                tarea[i] = $(`#txt${i}Tarea`).val();
            }
            guardarTarea();
        }
    });

    $('#btnBorrarTodo').click(function (e) { 
        borrarTodo(); 
    });

    const guardarTarea = () =>{ //Registra la tarea en el locaStorage
        numeroTareas = localStorage.getItem('numeroTareas'); //Obtener el numero de tareas guardado
        numeroTareas++;
        console.log(numeroTareas);
        localStorage.setItem(`tarea${numeroTareas}`, JSON.stringify(tarea));    
        localStorage.setItem('numeroTareas', numeroTareas);
        agregarTarea(numeroTareas);
    }

    const agregarTarea = (tareaMax) =>{ //Mostrar Tarea en un contenedor propio al gruadar
        let tareaMostrar = localStorage.getItem(`tarea${tareaMax}`); //Obtencion de los datos de la ultima tarea

        //Creación del div cdonde se va a guardar la ultima tarea
        let elementTarea = document.createElement('div');//Contenedor donde se va almacenar la tarea
        elementTarea.setAttribute('class', 'tarea');
        elementTarea.setAttribute('id', `tarea${tareaMax}`);
        $('.container-mostrar-tareas').append(elementTarea);

        for (let t in tarea) {//For para recorrer todo el Array del la ultima tarea
            if (t == 'Nombre') {
                $(`#tarea${tareaMax}`).append(`<p class='item-tarea'><b>Tarea:</b> ${JSON.parse(tareaMostrar)[t]}</p><br>`);
            }
            if (t == 'Descripcion') {
                $(`#tarea${tareaMax}`).append(`<p class='item-tarea'><b>Descripción:</b> ${JSON.parse(tareaMostrar)[t]}</p><br>`);
            }
            if (t == 'Fecha') {
                $(`#tarea${tareaMax}`).append(`<p class='item-tarea'><b>Fecha de entrega:</b><br> ${JSON.parse(tareaMostrar)[t]}</p><br>`);
            }
            console.log(JSON.parse(tareaMostrar)[t]);

            $('#txtNombreTarea').val("");
            $('#txtDescripcionTarea').val("");
            $('#txtFechaTarea').val("");
        }

        let btnBorrarTarea = document.createElement('button');
        btnBorrarTarea.setAttribute('id', `btnBorrarTarea${tareaMax}`);
        btnBorrarTarea.setAttribute('class', 'btnBorrarTarea');
        btnBorrarTarea.innerHTML = "Finalizar Tarea";
        $(`#tarea${tareaMax}`).append(btnBorrarTarea);

        $('.btnBorrarTarea').click(function (e) {  //Boton para enviar a la zona de tareas terminadas. Verifica cuando se presiona cualquier boton
            for (let i = 1; i <= numeroTareas; i++) {
                $(`#btnBorrarTarea${i}`).click(function (e) {//Detecta cual de todos los botones se presionaron por el id
                    const containerTarea = $(`#tarea${i}`); //Inicializa el objeto
                    localStorage.setItem(`estadoTarea${i}`, true); //Guarda el estado de esas tarea
    
                    var estadoTarea = localStorage.getItem(`estadoTarea${i}`);
                    if (estadoTarea) { //Se verifica que se haya presionado el btn y se aplican los cambios
                        $('.container-mostrar-tareas-terminadas').append(containerTarea);
                        $(`#tarea${i}`).addClass('tareaTerminada');
                        $(`#btnBorrarTarea${i}`).remove();
                    }
                }); 
            }   
        });
    }

    function mostrarTarea() {//Mostrar todas las tareas al iniciar la página
        numeroTareas = localStorage.getItem('numeroTareas');

        for (let i = 1; i <= numeroTareas; i++) {
            console.log(i);
            let tareaMostrar = localStorage.getItem(`tarea${i}`);
            const elementTarea = document.createElement('div');//Contenedor donde se va almacenar la tarea
            elementTarea.setAttribute('class', 'tarea');
            elementTarea.setAttribute('id', `tarea${i}`);

            let btnBorrarTarea = document.createElement('button'); //Creación del boton borrar 
            btnBorrarTarea.setAttribute('id', `btnBorrarTarea${i}`);
            btnBorrarTarea.setAttribute('class', 'btnBorrarTarea');
            btnBorrarTarea.innerHTML = "Finalizar Tarea";

            $('.container-mostrar-tareas').append(elementTarea); 
            for (let t in tarea) {
                if (t == 'Nombre') {
                    $(`#tarea${i}`).append(`<p class='item-tarea'><b>Tarea:</b> ${JSON.parse(tareaMostrar)[t]}</p><br>`);
                }
                if (t == 'Descripcion') {
                    $(`#tarea${i}`).append(`<p class='item-tarea'><b>Descripción:</b> ${JSON.parse(tareaMostrar)[t]}</p><br>`);
                }
                if (t == 'Fecha') {
                    $(`#tarea${i}`).append(`<p class='item-tarea'><b>Fecha de entrega:</b><br> ${JSON.parse(tareaMostrar)[t]}</p><br>`);
                }
                console.log(JSON.parse(tareaMostrar)[t]);
            }
            $(`#tarea${i}`).append(btnBorrarTarea);

            var estadoTarea = localStorage.getItem(`estadoTarea${i}`); //Se obtiene el estado de las tareas
            containerTarea = $(`#tarea${i}`); //Se otiene el objeto de la tarea
            if (estadoTarea) {
                $(`#tarea${i}`).addClass('tareaTerminada');
                $('.container-mostrar-tareas-terminadas').append(containerTarea);
                $(`#btnBorrarTarea${i}`).remove();
            }
        }
    }

    const borrarTodo = () =>{
        let respuestaConfirm = confirm("¿Estás seguro de eliminar todas las tareas? \n" + "Esto también eliminara las tareas finalizadas")
        if (respuestaConfirm) {
            localStorage.clear();
            $(".tarea").remove();
        }
    } 
});