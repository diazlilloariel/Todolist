const taskInput = document.querySelector('#taskInput');
const btnAdd = document.querySelector('.btn-add');
const totalTodos = document.querySelector('#totalTodos');
const completedTodos = document.querySelector('#completedTodos');
const tableBody = document.querySelector('#tableTodo tbody');
let todoID = 4;

const todoList = [
    {
        id: 1,
        dataId: 1,
        name: 'Cumplir en el trabajo',
        completed: false
    },
    {
        id: 2,
        dataId: 2,
        name: 'Cumplir en los estudios',
        completed: false
    },
    {
        id: 3,
        dataId: 3,
        name: 'Cumplir en casa',
        completed: false
    },
    {
        id: 4,
        dataId: 4,
        name: 'Descansar',
        completed: false
    }
];

function plantillaTarea(tarea) {
    return `
        <tr>
            <td>${ tarea.id }</td>
            <td id="tarea-texto-${tarea.id}">${ tarea.name }</td>
            <td style="width: 7.5rem;">
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input
                        id="checkbox-${tarea.id}"
                        class="form-check-input p-2"
                        type="checkbox"
                        ${ tarea.completed == true ? 'checked' : '' }
                        onchange="tareaCompletada(${tarea.id}, this.checked)"
                        />
                    </div>
                    <button class="btn btn-danger btn-sm btn-remove" type="button" onclick="eliminarTarea(${tarea.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function actualizarContadorTotales() {
    totalTodos.innerHTML = todoList.length;
    completedTodos.innerHTML = todoList.filter(todo => todo.completed).length;
}

function generarTodasLasTareas() {
    tableBody.innerHTML = '';
    todoList.forEach(tarea => {
        tableBody.innerHTML += plantillaTarea(tarea);
    });
    actualizarContadorTotales();
}

generarTodasLasTareas();

function agregarTarea(tareaInput) {
    const nuevaTarea = {
        id: ++todoID,
        name: tareaInput,
        completed: false
    };
    todoList.push(nuevaTarea);
    tableBody.innerHTML += plantillaTarea(nuevaTarea);
    actualizarContadorTotales();
}

function tareaCompletada(id, estado) {
    const tarea = todoList.find(todo => todo.id === id);
    if (!tarea) {
        console.error(`Tarea con ID ${id} no encontrada.`);
        return;
    }
    tarea.completed = estado;

    const tareaTexto = document.getElementById(`tarea-texto-${id}`);
    if (tareaTexto) {
        tareaTexto.classList.toggle('tarea-completada', estado);
    }

    actualizarContadorTotales();
}

function eliminarTarea(tareaID) {
    const index = todoList.findIndex(todo => todo.id === tareaID);
    if (index === -1) {
        console.error(`Tarea con ID ${tareaID} no encontrada.`);
        return;
    }
    todoList.splice(index, 1);
    generarTodasLasTareas();
    actualizarContadorTotales();
}

btnAdd.addEventListener('click', () => {
    const tareaInput = taskInput.value.trim();
    if (tareaInput.length === 0) {
        alert('Debes ingresar una tarea.');
        return;
    }
    agregarTarea(tareaInput);
    taskInput.value = '';
    actualizarContadorTotales();
});
