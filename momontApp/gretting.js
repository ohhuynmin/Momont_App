const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings')

const USER_LS="currentUser",
    SHOWING_CN="showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}
function handleSubmit(event){
    event.preventDefault();     //기본 기능막음
    const currentValue = input.value;   //input박스의 value를 가져옴
    paintGreeting(currentValue);    //value값을 paint해줄 함수로 전달
    saveName(currentValue);     //localStorage에 값 저장
}    
function askForName(){
    form.classList.add(SHOWING_CN);     //form의 input박스 show
    form.addEventListener("submit",handleSubmit);   //input박스에 submit->handleSubmit()호출
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);  //input박스 disable
    greeting.classList.add(SHOWING_CN); //인사말과 이름 출력하는 태그 보여줌
    greeting.innerHTML = `Welcome Hyunmin's Site! ${text}`;   
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);  //userName가져옴
    if(currentUser === null){       
        askForName();   //userName이 null일 경우 입력받음
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();     //localStorage에서 userName가져오는 함수 호출
}
init();