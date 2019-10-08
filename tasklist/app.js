
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListener();

function loadEventListener() {
    form.addEventListener('submit', addTask);
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please enter a task first.')
    } else {
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        listItem.appendChild(document.createTextNode(taskInput.value));

        const deleteItem = document.createElement('a');
        deleteItem.className = 'delelte-item secondary-content';
        deleteItem.innerHTML = '<i class="fa fa-remove"></i>';

        listItem.appendChild(deleteItem);

        taskList.appendChild(listItem);

        taskInput.value = '';
    }
    e.preventDefault();
}