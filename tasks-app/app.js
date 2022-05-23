//SEARCH


$(function() {
    console.log('Jquery is working fine!')
        //Se empieza ocultando el recuadro donde aparecerán los resultados
    $('#task-result').hide();

    fetchTasks();

    /*Obtiene el valor del id search cada vez que se da el evento keyup*/
    $('#search').keyup(function() {
        //Guarda el value de search en la variable search
        let search = $('#search').val();
        /**Con la función ajax(), envia por post el valor de search (variable ) al tasks-search.php y si 
         * es success obtiene la respuesta con el evento response.
         */
        $.ajax({
            url: 'tasks-search.php',
            type: 'POST',
            data: { search },
            success: function(response) {
                let tasks = JSON.parse(response);
                let template = '';
                //Recorre task y con un foreach me saca cada uno de los elementos y los imprime en la tabla
                tasks.forEach(task => {
                    template += `<li>
                   ${task.name}
                   </li>`
                });
                //Impresión de template html en el id container (tabla), se muestra el recuadro con show
                $('#container').html(template);
                $('#task-result').show();

            }
        })
    })



    //ADD

    $('#task-form').submit(function(e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
        };

        $.post('task-add.php', postData, function(response) {
                fetchTasks();
                //Reseteo del formulario
                $('#task-form').trigger('reset')
            })
            //preventDefault cancela el comportamiento por defecto del formulario 
            // (Hace que la página no se refresque cada vez que se presiona submit )
        e.preventDefault();
    })


    //LIST
    function fetchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response) {
                let tasks = JSON.parse(response);
                var template = '';
                tasks.forEach(task => {
                    template += `
                    <tr taskId ="${task.id}"> 
                    <td>${task.id}</td>
                    <td>${task.name}</td>
                    <td>${task.description}</td>
                    <td><button class="task-delete btn btn-danger">
                    Delete
                    </button></td>
                    </tr>
                    `
                });
                $('#tasks').html(template);
            }
        })
    }


    $(document).on('click', '.task-delete', function() {
        let element = $(this)[0].parentElement.parentElement
        let id = $(element).attr('taskId')
            //$.post envía el id al backend
        $.post('task-delete.php', { id }, function(response) {
            //Cuando se envía y se obtiene respuesta del servidor, se llama de nuevo a obtener tareas
            fetchTasks()
        })
    })
})