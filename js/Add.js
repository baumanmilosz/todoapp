let countTasks = 0;
class Add {
  constructor() {
    document.querySelector('.add-btn i').addEventListener('click', this.addTask);

  }

  addTask() {
    const taskInput = document.querySelector('.add-input');
    const tasksList = document.querySelector('.to-do-list');
    const taskCounter = document.querySelector('.amount-tasks .counter')
    const task = document.createElement('li');

    const date = new Date();
    const formatDate = `${date.getHours()}:${date.getMinutes()}`;

    task.classList.add('list-item');
    task.innerHTML = `<div class="item-header">
          <h2 class="title">${taskInput.value}</h2>
          <p class="add-date">Data dodania: ${formatDate}</p>
        </div>
        <button class="delete-btn">
          <i class="far fa-trash-alt"></i>
        </button>`;

    tasksList.appendChild(task);
    countTasks++;
    taskInput.value = "";
    taskCounter.textContent = countTasks;
  }
}