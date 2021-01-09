const toDoform = document.querySelector('.js-toDoForm');
const toDoinput = toDoform.querySelector("input");
const toDoList = document.querySelector('.js-toDoList');

const TODO_LS='toDos';
let toDos = [];
let idCounts = 1;
function deleteToDo(e){
    const btn = e.target; 
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(e=>{
        return e.id !== parseInt(li.id);    //li의 id는 String형태이므로 변환
    });
    toDos=[];
    idCounts=1;
    console.log(cleanToDos.length);
    while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
    }
    cleanToDos.forEach(e=>{
        paintToDo(e.text);      //data 삭제시 다른데이터의 id값을 실시간 갱신
    });
    if(cleanToDos.length == 0){
        localStorage.removeItem(TODO_LS);
    }

}

function saveToDos(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos)); //Oject를 JSON형식으로 변환후 저장
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "✔";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = idCounts;
    idCounts++;
    span.innerHTML = text+"";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id: newId,
    }
    toDos.push(toDoObj);
    saveToDos();
}

function todo_handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value ="";
}
function loadToDos(){
    const loadToDos = localStorage.getItem(TODO_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(e => {
            paintToDo(e.text);      //localStorage에 저장된 데이터를 다시 paint해줌
        });
    }
}

function init(){
    loadToDos();
    toDoform.addEventListener("submit",todo_handleSubmit);
}
init();