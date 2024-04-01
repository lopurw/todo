const todoList =document.querySelector('#todo-list');
const todoForm =document.querySelector('#todo-form');
const todoInput =document.querySelector('#todo-input');


todoForm.addEventListener('submit', formHandler)
function formHandler(event){
    event.preventDefault();
    console.log('sub');

    // //получаем текст из инпута
    const taskText = todoInput.value;

    //создаем тег li через элемент
    const newTask = document.createElement('li');
    newTask.innerText=taskText;
    todoList.append(newTask);
    newTask.classList.add('color');
    todoInput.value ='';

    //фокус на поле ввода 
    todoInput.focus();

    //создаем кнопку удалить
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('role','button');
    deleteButton.innerText='Удалить';
    newTask.append(deleteButton);
    deleteButton.classList.add('del_bt');
    deleteButton.addEventListener('click', function(){
        this.closest('li').remove(); //ищет ближайшего родителя li и удаляет
    });

    


}
