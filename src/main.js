import "./style.css";

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');



let allTodos = [];

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();

});

function addTodo(){
    const todoText = todoInput.value;
        if(todoText.length > 0){
            allTodos.push(todoText);
            updateTodoList();
            saveTodos();
            todoInput.value = "";
            
            
        }
        
    }
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        let todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
};   

function createTodoItem(todo, todoIndex){
    const todoID = "todo-"+todoIndex;
    const todoLI = document.createElement('li');
    todoLI.className = "todo";
    todoLI.innerHTML = `
    <input type="checkbox" id="${todoID}">
    <label class="custom-checkbox" for="${todoID}">

      <svg class="custom-checkbox" xmlns="http://www.w3.org/2000/svg" 
        width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4 8L11 1" stroke="transparent" stroke-width="2"/>
      </svg>
    </label>
    <label for="${todoID}" class="todo-text">
      ${todo}
    </label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 2V1.5C3 1.22 3.22 1 3.5 1H8.5C8.78 1 9 1.22 9 1.5V2M1 2H11M2 2V10C2 10.55 2.45 11 3 11H9C9.55 11 10 10.55 10 10V2" stroke="#888888" stroke-width="1" fill="none"/>
        <path d="M4.5 4V9M7.5 4V9" stroke="#888888" stroke-width="1"/>
      </svg>

    </button>
    `
    return todoLI;
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}