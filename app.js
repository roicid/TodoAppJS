//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//event listeners
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click" , filterTodo);

//functions

function addTodo(event) {
    //prevent form from submiting
    event.preventDefault();
    // ToDo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATE LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // CHECK MARK BUTTON 

    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //apend to list
    todoList.appendChild(todoDiv);

    //clear TODO INPUT VALUE ;
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //  DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        // animation
        todo.classList.add("fall");
        removeLocalTodo(todo);

        // wait and only execute where the animation completed
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    // COMPLETE TODO
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


//filter 

function filterTodo(e) {
    const todos =  todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all" : 
            todo.style.display= "flex" ;
            break;
            case "completed" : 
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex' ;
            }else {
                todo.style.display ="none" ;
                
            }
            break;
            case "uncompleted" :
                if(!todo.classList.contains('completed')){
                    todo.style.display ="flex";
                }else{
                    todo.style.display="none";
                }
                break;
        }
       
});
}

function saveLocalTodos(todo){
    //   CHECK '' DO I HAVE A THING IN THERE?


    let todos 
    //check if we have todos if it dont have it will create an empty array
    if (localStorage.getItem('todos') === null){
        todos = [];
        
    }else{
        //if we DO HAVE , we are gonna be left with an array
        todos =JSON.parse(localStorage.getItem('todos'))
    }// if we do we are going tu push the new todo and sent it back to local storage
    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos))
}

function getTodos(){
    console.log('hello')
    let todos 
    //check if we have todos if it dont have it will create an empty array
    if (localStorage.getItem('todos') === null){
        todos = [];
        
    }else{
        //if we DO HAVE , we are gonna be left with an array
        todos =JSON.parse(localStorage.getItem('todos'))
    }// if we do we are going tu push the new todo and sent it back to local storage
   todos.forEach(function(todo){

    // ToDo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATE LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // CHECK MARK BUTTON 

    // ADD TODO TO LOCALSTORAGE
    

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //apend to list
    todoList.appendChild(todoDiv); 
 
    
}

)
   

}

function removeLocalTodo(todo){
    let todos 
    //check if we have todos if it dont have it will create an empty array
    if (localStorage.getItem('todos') === null){
        todos = [];
        
    }else{
        //if we DO HAVE , we are gonna be left with an array
        todos = JSON.parse(localStorage.getItem('todos'))
        
}
const todoIndex = todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex), 1);
localStorage.setItem("todos" , JSON.stringify(todos));

}
