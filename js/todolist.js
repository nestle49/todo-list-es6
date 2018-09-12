
let listToDoHTML = document.querySelectorAll(".todo-list");
let template = document.querySelector("#item-todo-list-template").content.querySelector("li");

let outputToDoList = arrListToDo => { /* Функция вывода шаблона */
  for (let i = 0; i < arrListToDo.length; i++) {
  	let elementItem = template.cloneNode(true);
  	elementItem.insertAdjacentHTML('afterbegin', arrListToDo[i]);
    listToDoHTML[0].appendChild(elementItem);
  }
}

let removeChildren = element => { /* Удалить всех потомков */
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

let arrListToDo = []; /* Массив строк To-Do листа */

if (JSON.parse(localStorage.getItem("arrListToDo"))) { /* Если в локалстор существует такой массив и он не пуст, */
  arrListToDo = JSON.parse(localStorage.getItem("arrListToDo")); /* выведем список */
  outputToDoList(arrListToDo);
}

document.querySelector('.clean-value').addEventListener('click', function(e){ /* Событие очиски инпута по клику */
  let field = document.querySelector('.main-form__field');
  field.value = '';
});

document.querySelector('.add-todo').addEventListener('click', function(e){ /* Событие добавления записи с инпута */
  let field = document.querySelector('.main-form__field');
	if (field.value && field.value !== ' ') {
    arrListToDo.push(field.value); /* добавить элемент в массимв */
    removeChildren(document.querySelector(".todo-list")); /* Очистить лист */
    outputToDoList(arrListToDo); /* Вывести обновленный список */
    localStorage.setItem("arrListToDo", JSON.stringify(arrListToDo)); /* Обновить в локалстор */
    location.reload(); /* fixme */
		field.value = '';
	}
});



let addCheckElements = document.querySelectorAll(".add-check"); /* Получим все элементы с искомым классом */
for (let i = 0; i < addCheckElements.length; i++) {
  addCheckElements[i].addEventListener('click', function(e){
    arrListToDo.splice(i, 1); /* По клику удаляем элемент, сдвигая массив */
    removeChildren(document.querySelector(".todo-list"));  /* Очистить лист */
    outputToDoList(arrListToDo); /* Вывести обновленный список */
    localStorage.setItem("arrListToDo", JSON.stringify(arrListToDo)); /* Обновить в локалстор */
    location.reload(); /* fixme */
  });
}


let addDeleteElements = document.querySelectorAll(".delete-todo"); /* Получим все элементы с искомым классом */
for (let i = 0; i < addDeleteElements.length; i++) {
  addDeleteElements[i].addEventListener('click', function(e){
    arrListToDo.splice(i, 1); /* По клику удаляем элемент, сдвигая массив */
    removeChildren(document.querySelector(".todo-list"));  /* Очистить лист */
    outputToDoList(arrListToDo); /* Вывести обновленный список */
    localStorage.setItem("arrListToDo", JSON.stringify(arrListToDo)); /* Обновить в локалстор */
    location.reload(); /* fixme */
  });
}

let addUpCheckElements = document.querySelectorAll(".up-check"); /* Получим все элементы с искомым классом */
for (let i = 0; i < addUpCheckElements.length; i++) {
  addUpCheckElements[i].addEventListener('click', function(e){
    if (i > 0) {
          [arrListToDo[i], arrListToDo[i-1]] = [arrListToDo[i-1], arrListToDo[i]];
    }
    removeChildren(document.querySelector(".todo-list"));  /* Очистить лист */
    outputToDoList(arrListToDo); /* Вывести обновленный список */
    localStorage.setItem("arrListToDo", JSON.stringify(arrListToDo)); /* Обновить в локалстор */
    location.reload(); /* fixme */
  });
}

let addDownCheckElements = document.querySelectorAll(".down-check"); /* Получим все элементы с искомым классом */
for (let i = 0; i < addDownCheckElements.length; i++) {
  addDownCheckElements[i].addEventListener('click', function(e){
    if (i < arrListToDo.length-1) {
          [arrListToDo[i], arrListToDo[i+1]] = [arrListToDo[i+1], arrListToDo[i]];
    }
    removeChildren(document.querySelector(".todo-list"));  /* Очистить лист */
    outputToDoList(arrListToDo); /* Вывести обновленный список */
    localStorage.setItem("arrListToDo", JSON.stringify(arrListToDo)); /* Обновить в локалстор */
    location.reload(); /* fixme */
  });
}


console.log(arrListToDo);
