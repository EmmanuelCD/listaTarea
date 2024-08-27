var _a;
var currentEditingRow = null;
var rowId = 0; // Para asignar IDs únicos a las filas
// Función para validar los datos del formulario
function validateInput(nombre, descripcion) {
    if (!nombre.trim() || !descripcion.trim()) {
        alert('Por favor, complete todos los campos correctamente.');
        return false;
    }
    return true;
}
// Función para añadir o actualizar los datos en la tabla
function addOrUpdateToTable(nombre, descripcion) {
    var tableBody = document.querySelector('#dataTable tbody');
    // Crea un objeto tableRowData
    var tableRowData = {
        nombre: nombre,
        descripcion: descripcion,
        estado: currentEditingRow ? (currentEditingRow.getElementsByTagName('td')[3].textContent || 'Activo') : 'Activo'
    };
    if (currentEditingRow) {
        // Actualizar la fila existente
        var cells = currentEditingRow.getElementsByTagName('td');
        cells[1].textContent = tableRowData.nombre;
        cells[2].textContent = tableRowData.descripcion;
        cells[3].textContent = tableRowData.estado;
        currentEditingRow = null; // Limpia la fila en edición
    }
    else {
        // Añadir una nueva fila
        rowId++;
        var newRow_1 = tableBody.insertRow();
        newRow_1.id = "row-".concat(rowId); // Asignar ID único a la fila
        var cellId = newRow_1.insertCell(0);
        var cellName = newRow_1.insertCell(1);
        var cellDescripcion = newRow_1.insertCell(2);
        var cellStatus = newRow_1.insertCell(3); // Columna para el estado
        var cellActions = newRow_1.insertCell(4);
        cellId.textContent = rowId.toString();
        cellName.textContent = tableRowData.nombre;
        cellDescripcion.textContent = tableRowData.descripcion;
        cellStatus.textContent = tableRowData.estado;
        // Crear botones de modificar, eliminar y terminar
        // Crear el botón de editar con icono
        var editButton = document.createElement('button');
        editButton.className = 'btn btn-primary'; // Añadir clase de Bootstrap para estilos
        editButton.innerHTML = '<i class="bi bi-pencil"></i> '; // Añadir icono y texto
        editButton.onclick = function () { return editRow(newRow_1); };
        // Crear el botón de eliminar con icono
        var deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger'; // Añadir clase de Bootstrap para estilos
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; // Añadir icono y texto
        deleteButton.onclick = function () { return deleteRow(newRow_1); };
        // Crear el botón de terminar con icono
        var finishButton = document.createElement('button');
        finishButton.className = 'btn btn-success'; // Añadir clase de Bootstrap para estilos
        finishButton.innerHTML = '<i class="bi bi-check-circle"></i>'; // Añadir icono y texto
        finishButton.onclick = function () { return finishRow(newRow_1); };
        // Añadir los botones a la celda de acciones
        cellActions.appendChild(editButton);
        cellActions.appendChild(deleteButton);
        cellActions.appendChild(finishButton);
    }
}
// Función para eliminar una fila
function deleteRow(row) {
    if (confirm('¿Estás seguro de que deseas eliminar esta fila?')) {
        row.remove();
    }
}
// Función para modificar una fila
function editRow(row) {
    var cells = row.getElementsByTagName('td');
    var nombre = cells[1].textContent || '';
    var descripcion = cells[2].textContent || '';
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    // Cambia el botón para que funcione como "Actualizar"
    var addButton = document.getElementById('addButton');
    addButton.textContent = 'Actualizar';
    // Almacena la fila actualmente en edición
    currentEditingRow = row;
}
// Función para terminar una fila (cambiar el estado a "Terminado")
function finishRow(row) {
    var cells = row.getElementsByTagName('td');
    cells[3].textContent = 'Terminado'; // Cambia el estado a "Terminado"
}
// Función para limpiar el formulario
function clearForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
}
// Evento al hacer clic en el botón
(_a = document.getElementById('addButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var nameInput = document.getElementById('nombre');
    var descripcionText = document.getElementById('descripcion');
    var nombre = nameInput.value.trim();
    var descripcion = descripcionText.value.trim();
    if (validateInput(nombre, descripcion)) {
        addOrUpdateToTable(nombre, descripcion);
        clearForm();
        document.getElementById('addButton').textContent = 'Añadir a la tabla';
    }
});
