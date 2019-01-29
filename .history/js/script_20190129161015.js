const addBtn = document.querySelector('.add-btn i');
const toDoList = document.querySelector('.to-do-list');
const listItems = document.getElementsByClassName('list-item');
const counter = document.querySelector('.counter');
const switchBtn = document.querySelector('.mode-icon');
const searchInput = document.querySelector('.search-input');
const day = document.querySelector('.day');
const modeBtn = document.querySelector('.mode-btn');
const inputAdd = document.querySelector('.add-input');
const wrapper = document.querySelector('.wrapper');

// DATE
const today = new Date();
if (today.getDate() < 10) {
  day.textContent = `0${today.getDate()}`;
} else {
  day.textContent = today.getDate();
}

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
document.querySelector('.month').textContent = months[today.getMonth()];
document.querySelector('.year').textContent = today.getFullYear();

const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
document.querySelector('.week-day').textContent = weekDays[today.getDay()];

//  COUNTER
let amountTask = 0;
counter.textContent = amountTask;

// ADD TASK
const addTask = (e) => {
  if (e.keyCode === 13 || e.type === 'click') {
    const inputAdd = document.querySelector('.add-input');
    if (!inputAdd.value) return alert('Wprowadź wartość');

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (date.getHours() < 10) {
      hours = `0${date.getHours()}`;
    } else if (date.getMinutes() < 10) {
      minutes = `0${date.getMinutes()}`;
    }

    const toDoItem = document.createElement('li');
    toDoItem.classList.add('list-item');
    toDoItem.innerHTML = `
  <div class="item-header">
    <h2 class="title">${inputAdd.value}</h2>
    <p class="add-date">${hours}:${minutes}</p>
  </div>
  <button class="delete-btn">
    <i class="far fa-trash-alt"></i>
  </button>`;

    toDoList.appendChild(toDoItem);
    inputAdd.value = '';

    amountTask = listItems.length;
    counter.textContent = amountTask;
  }
}

// REMOVE TASK
const removeTask = (e) => {
  if (e.keyCode === 46) {
    if (toDoList.childElementCount > 0) {
      toDoList.lastChild.remove();
      amountTask--;
      counter.textContent = amountTask;
    }
  } else if (e.target.nodeName === "I") {
    e.target.parentElement.parentElement.remove();
    amountTask = listItems.length;
    counter.textContent = amountTask;
  }
}

// SEARCH TASK
const searchTask = (e) => {
  const el = document.querySelectorAll('.list-item');
  const enterValue = e.target.value.toLowerCase();
  el.forEach(el => {
    const text = el.innerText;
    if (text.indexOf(enterValue) !== -1) {
      el.style.display = ''
    } else {
      el.style.display = 'none';
    }
  })
}

// NIGHT MODE
const changeMode = (e) => {
  const toDoList = document.querySelector('.to-do-list');
  toDoList.classList.toggle('night');

  if (toDoList.classList.contains('night')) {
    document.querySelector('.wrapper').style.backgroundImage = 'var(--dark-bg)';
  } else {
    document.querySelector('.wrapper').style.backgroundImage = 'var(--light-bg)';
  }
}

// QUERY SELECTORS
document.querySelector('.search-btn').addEventListener('click', () => {
  document.querySelector('.search-bar').classList.toggle('open');
});
addBtn.addEventListener('click', addTask);
inputAdd.addEventListener('keyup', addTask);
window.addEventListener('keyup', removeTask);
window.addEventListener('keyup', (e) => {
  if (e.ctrlKey && e.keyCode === 89) {
    document.querySelector('.search-bar').classList.toggle('open');
  }
});
toDoList.addEventListener('click', removeTask);
searchInput.addEventListener('input', searchTask);
modeBtn.addEventListener('click', changeMode);