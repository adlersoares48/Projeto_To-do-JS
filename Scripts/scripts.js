// SELEÇÃO DE ELEMENTOS -------------------------------------------------------

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
let oldInputValue

// FUNÇÕES -------------------------------------------------------------------

// Função para criar uma div e adicionar a section de resultados class = "todo-list"
const saveTodo = (text) => {
    //criar a div principal (pai) e adicionar a classe todo
    const todo = document.createElement("div")
    todo.classList.add("todo")

    //criar o h3 e adicionar ao elemento pai div.todo
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    //criar um botão (finish, edit ou remove), adicionar uma classe, adicionar o icone no texto e adicinar tudo ao elemento pai
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    //Adicionar a div criada "todo" a section pai class = "todo-list"
    todoList.appendChild(todo)

    //Após enviar o formulário, limpar os valores e focar novamente a escrita
    todoInput.value = ""
    todoInput.focus()
}

// Função para o botão de editar, essa função vai trocar as classes dos elementos, fazendo com que uma apareça enquanto a outra se esconde "hide"
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")

}

// Função para atualizar as edições
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
} 

// EVENTOS -------------------------------------------------------------------

// Evento para enviar o formulário e salvar o resultado
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const inputValue = todoInput.value
    if(inputValue) {
        // Salvar to-do
        saveTodo(inputValue)
    }

})

// Evento que vai escutar todo o documento e mapear os botões que eu quero utilizar
document.addEventListener("click", (e) => {

    const targetEl = e.target //Refere-se ao elemento que foi clicado
    const parentEl = targetEl.closest("div") // Adiciona um elemento pai para o alvo clicado, nesse caso será uma div. Ou seja, a div mais proxima será o elemento pai
    let todoTitle //Variavel para pegar todos os titulos

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText
    }


    // Se o elemento clicado tiver uma classe chamada 'finish-todo' eu
    // quero alterar ao elemento pai a classe 'done' e se caso ele já
    // tenha a classe adicionada eu quero remove-la (TOGGLE - troca)
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }

    // Mesma ideia para o remove
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove()
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

})

// Evento para o botão de cancelar da edição (Retrocar os resultados)
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value
    if(editInputValue){
        //Atualizar
        updateTodo(editInputValue)
    }
    toggleForms()
})