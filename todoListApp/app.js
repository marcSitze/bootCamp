const input = document.querySelector('#inputText');
const addBtn = document.querySelector('.addTodo');

let todos = [];

addBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('inputText: ', input.value);
});
