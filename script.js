document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        if (taskText.trim() === '') return;

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="complete">Complete</button>
        `;

        taskItem.querySelector('.edit').addEventListener('click', () => {
            const newText = prompt('Edit task:', taskItem.querySelector('span').innerText);
            if (newText !== null && newText.trim() !== '') {
                taskItem.querySelector('span').innerText = newText;
                saveTasks();
            }
        });

        taskItem.querySelector('.delete').addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });

        taskItem.querySelector('.complete').addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(taskItem);
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(task => ({
            text: task.querySelector('span').innerText,
            completed: task.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="complete">Complete</button>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.querySelector('.edit').addEventListener('click', () => {
                const newText = prompt('Edit task:', taskItem.querySelector('span').innerText);
                if (newText !== null && newText.trim() !== '') {
                    taskItem.querySelector('span').innerText = newText;
                    saveTasks();
                }
            });

            taskItem.querySelector('.delete').addEventListener('click', () => {
                taskItem.remove();
                saveTasks();
            });

            taskItem.querySelector('.complete').addEventListener('click', () => {
                taskItem.classList.toggle('completed');
                saveTasks();
            });

            taskList.appendChild(taskItem);
        });
    }
});