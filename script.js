const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
var todo_array = [];


document.addEventListener('DOMContentLoaded', ()=>{
  
  // if there are todos in localStorage
  var todos = JSON.parse(localStorage.getItem('todo'))

  if(todos != null) {
    for(var i=0; i<todos.length; i++) {
      set_todo(todos[i])
    }
  }
})


async function newTodo() {

  // show an alert to enter todo
  const {value: message} = await Swal.fire({
    title:'Enter',
    input: 'text',
    inputPlaceholder: 'type in your todo!'
  })
  if(message){
    set_todo(message)
    todo_array.push(message)
  }
  
  // store the list to localstorage
  localStorage.setItem('todo', JSON.stringify(todo_array))
}


function set_todo(message) {
  const li = document.createElement('li');
  li.innerHTML = 
  `<p id='${todo_array.length}'> ${message} </p>

    <div>
      <button onclick="delete_todo(${todo_array.length})"> complete </button>
      <button onclick="delete_todo(${todo_array.length})" > delete </button>
    </div>`;

  list.append(li)

  // update counter
  update_counter()
}


function delete_todo(id) {
  const p = document.getElementById(id)
  const li = document.getElementById(id).parentElement

  // delete from localStorage
  const index = todo_array.indexOf(p.innerText)
  todo_array.splice(index, 1)
  
  // delete from html
  li.remove()

  // update counter
  update_counter()
}

function update_counter() {
  itemCountSpan.innerHTML = list.childElementCount
  uncheckedCountSpan.innerHTML = list.childElementCount
}