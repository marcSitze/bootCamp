const form = document.querySelector('#form');
const addBtn = document.querySelector('.addTodo');
const editBtn = document.querySelector('.editTodo');
const ul = document.querySelector('ul');

let todos = [];
let updating = false;
let todoToUpdate = '';
// { id, text}

const item = (data) => `<li><span>${data.text}</span><button data-id=${data.id} class="close">X</button></li>`

const addTodo = e => {

  if(form.text.value) {
    // add todo to our array of todos
    const data = {
      id: generateID(),
      text: form.text.value,
    };

    todos.push(data);
    console.log(todos);

    // update the UI
      ul.innerHTML += item(data);
      form.reset();
      form.text.focus();
  }
}

const generateID = () => {
  if(todos.length === 0) {
    return 1;
  }else{
    return todos[todos.length - 1].id + 1
  }
}

const deleteTodo = id => {
    todos = todos.filter((data) => data.id !== Number(id));
    ul.innerHTML = '';

    todos.forEach(todo => {
      ul.innerHTML += item(todo);
    })

}

addBtn.addEventListener('click', addTodo);
ul.addEventListener('click', e => {
  window.e = e;
  const id = e.target.getAttribute('data-id');
  if(e.target.classList.contains('close') && e.target.getAttribute('data-id')) {
    deleteTodo(id);
  }

});
