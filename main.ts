let currentEditingRow: HTMLTableRowElement | null = null;
let rowId = 0; // Para asignar IDs únicos a las filas

// Función para validar los datos del formulario
function validateInput(name: string, descripcion: string): boolean {
    if (!name || !descripcion) {
        alert('Por favor, complete todos los campos correctamente.');
        return false;
    }
    return true;
}
 
// Función para añadir o actualizar los datos en la tabla
function addOrUpdateToTable(name: string, descripcion: string): void {
    const tableBody = document.querySelector('#dataTable tbody') as HTMLTableSectionElement;

    if (currentEditingRow) {
        // Actualizar la fila existente
        const cells = currentEditingRow.getElementsByTagName('td');
        cells[1].textContent = name;
        cells[2].textContent = descripcion;
        currentEditingRow = null; // Limpia la fila en edición
    } else {
        // Añadir una nueva fila
        rowId++;
        const newRow = tableBody.insertRow();
        newRow.id = `row-${rowId}`; // Asignar ID único a la fila
        const cellId = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellDescripcion = newRow.insertCell(2);
        const cellStatus = newRow.insertCell(3); // Columna para el estado
        const cellActions = newRow.insertCell(4);

        cellId.textContent = rowId.toString();
        cellName.textContent = name;
        cellDescripcion.textContent = descripcion;
        cellStatus.textContent = 'Activo'; // Estado inicial

        // Crear botones de modificar, eliminar y terminar
        const editButton = document.createElement('button');
        editButton.textContent = 'Modificar';
        editButton.onclick = () => editRow(newRow);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteRow(newRow);

        const finishButton = document.createElement('button');
        finishButton.textContent = 'Terminar';
        finishButton.onclick = () => finishRow(newRow);

        cellActions.appendChild(editButton);
        cellActions.appendChild(deleteButton);
        cellActions.appendChild(finishButton);
    }
}

// Función para eliminar una fila
function deleteRow(row: HTMLTableRowElement): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta fila?')) {
        row.remove();
    }
}

// Función para modificar una fila
function editRow(row: HTMLTableRowElement): void {
    const cells = row.getElementsByTagName('td');
    const name = cells[1].textContent || '';
    const descripcion = cells[2].textContent || '';

    (document.getElementById('name') as HTMLInputElement).value = name;
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = descripcion;

    // Cambia el botón para que funcione como "Actualizar"
    const addButton = document.getElementById('addButton') as HTMLButtonElement;
    addButton.textContent = 'Actualizar';

    // Almacena la fila actualmente en edición
    currentEditingRow = row;
}

// Función para terminar una fila (cambiar el estado a "Terminado")
function finishRow(row: HTMLTableRowElement): void {
    const cells = row.getElementsByTagName('td');
    cells[3].textContent = 'Terminado'; // Cambia el estado a "Terminado"
}

// Función para limpiar el formulario
function clearForm(): void {
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = '';
}

// Evento al hacer clic en el botón
document.getElementById('addButton')?.addEventListener('click', () => {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const descripcionText = document.getElementById('descripcion') as HTMLTextAreaElement;

    const name = nameInput.value.trim();
    const descripcion = descripcionText.value.trim();

    if (validateInput(name, descripcion)) {
        addOrUpdateToTable(name, descripcion);
        clearForm();
        (document.getElementById('addButton') as HTMLButtonElement).textContent = 'Añadir a la tabla';
    }
});
