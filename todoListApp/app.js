const input = document.querySelector('#inputText');
const addBtn = document.querySelector('.addTodo');
const error = document.querySelector('.error');
const list = document.querySelector('ul');

let todos = [];

// Method 01
const generateID = () => {
  if(todos.length === 0) {
    return 1;
  }else{
    return todos[todos.length - 1].id + 1;
  }
}
// Method 02
// const generateID2 = () => new Date().getTime();

function generateItem(todo) {
  return `<li><span>${todo.text}</span><button data-id=${todo.id} class="close">X</button></li>`
}

const updateUI = () => {
  list.innerHTML = '';
  console.log('todos: ', todos)
  todos.forEach(todo => {
    list.innerHTML += generateItem(todo)
  })
}
// addTodo
const addTodo =  e => {
  e.preventDefault();
  if(input.value !== '') {
    // then we can add a new todo
    console.log('input.value: ', input.value);
    const data = {
      id: generateID(),
      text: input.value,
    }
    // Push data in todo Array
    todos.push(data);
    input.value = '';
    input.focus();
    // Update the UI
    // first Empty the content of the list div before
    // looping
    updateUI()

  }else{
    error.textContent = 'Please enter valid informations';
    setTimeout(() => {
      error.textContent = '';
    }, 2500);
  }
}

const deleteTodo = (id) => {
  // Filter Todos based on id match
  todos = todos.filter((data) => data.id !== id);

    // Update UI
  updateUI()
}

// Event Listeners
  // add todo event
addBtn.addEventListener('click', addTodo);
  // delete todo event
list.addEventListener('click', e => {
  console.log('e: ', e.target.getAttribute("data-id"));
  window.event = e;
  if(e.target.getAttribute('data-id') && e.target.classList.contains('close')) {
const id = Number(e.target.getAttribute('data-id'))
    deleteTodo(id);
  }
})