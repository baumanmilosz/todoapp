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
const formAdd = document.querySelector('.add-form');
const items = JSON.parse(localStorage.getItem('items')) || [];
let amountTask = null;

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


// UPDATE LIST
const updateList = function () {
  toDoList.innerHTML = items.map((item, key) => {
    return `<li class="list-item" data-key=${key}>
      <div class="item-header">
      <h2 class="title">${item.value}</h2>
      <p class="add-date">${item.date}</p>
    </div>
    <button class="delete-btn">
      <i class="far fa-trash-alt"></i>
    </button></li>`
  }).join('');
  amountTask = items.length;
  counter.textContent = amountTask;
}
updateList();

// ADD TASK
const addTask = (e) => {
  e.preventDefault();
  if (e.keyCode === 13 || e.type === 'submit') {
    const inputAdd = document.querySelector('.add-input');
    if (!inputAdd.value) {
      inputAdd.setAttribute('placeholder', 'Input value!');
      inputAdd.classList.add('empty');
      return;
    }
    inputAdd.setAttribute('placeholder', 'Add new task...');
    inputAdd.className = 'add-input';

    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (date.getHours() < 10) {
      hours = `0${date.getHours()}`;
    }
    if (date.getMinutes() < 10) {
      minutes = `0${date.getMinutes()}`;
    }

    const item = {
      value: inputAdd.value,
      date: `${hours}:${minutes}`,
    }
    items.push(item);

    updateList();
    formAdd.reset();

    amountTask = items.length;
    counter.textContent = amountTask;

    localStorage.setItem('items', JSON.stringify(items));
  }
}

// REMOVE TASK
const removeTask = (e) => {
  if (e.keyCode === 46 || e.target.nodeName === "I") {
    localStorage.removeItem('items');
    if (e.keyCode === 46) {
      if (toDoList.childElementCount > 0) {
        items.pop();
        amountTask--;
        counter.textContent = amountTask;
        localStorage.setItem('items', JSON.stringify(items));
      }

    } else if (e.target.nodeName === "I") {
      const removeIndex = e.target.parentElement.parentElement.dataset.key;
      e.target.parentElement.parentElement.remove();
      items.splice(removeIndex, 1);
      amountTask--;
      counter.textContent = amountTask;
      localStorage.setItem('items', JSON.stringify(items));
    }
    updateList();
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
formAdd.addEventListener('submit', addTask);
window.addEventListener('keyup', removeTask);
window.addEventListener('keyup', (e) => {
  if (e.ctrlKey && e.keyCode === 89) {
    document.querySelector('.search-bar').classList.toggle('open');
  }
});
toDoList.addEventListener('click', removeTask);
searchInput.addEventListener('input', searchTask);
modeBtn.addEventListener('click', changeMode);