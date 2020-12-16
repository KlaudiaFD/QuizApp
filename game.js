const question=document.querySelector('.question');
const choices=Array.from(document.getElementsByClassName('choice-answer'));
const scoreCounter=document.querySelector('.scoreCounter')

let currentQuestion={};   // aktualne pytania
let acceptAnswers= false;
let score=0;
let questionsCounter=0;   //licznik pytan
let availableQuestions=[];  //dostępne pytania

let questions=[
    {
        question: "Inside which HTML element do we put in JavaScript?",
        choice1: "<scrip>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an axternal script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script scr='xxx.js'>",
        choice4: "<script file= 'xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox ('Hello World')",
        choice2: "alertBox ('Hello World') ",
        choice3: "msg ('Hello World') ",
        choice4: "alert(Hello World')",
        answer: 4
    }
    
];


const maxQuestions=3;

startGame=()=>{
    questionsCounter=0;
    score=0;
    availableQuestions=[ ... questions];
    getNewQuestions();
};

getNewQuestions=()=>{

    if(availableQuestions.length === 0 || questionsCounter >= maxQuestions){
        localStorage.setItem('recentScore', score);
        return window.location.assign('/end.html');
    } //end the game


    questionsCounter++;

    //counter of quesions
    scoreCounter.innerText= questionsCounter + '/' + maxQuestions;



    const questionIndex= Math.floor(Math.random()* availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>{
        const number = choice.dataset['number'];
        choice.innerText=currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptAnswers=true;
};

choices.forEach(choice =>{
    choice.addEventListener('click', e=>{
        if(!acceptAnswers)return;
        
        acceptAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset['number'];
        
        //correct on incorrect questions, green/red//
        const classSelect= selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.parentElement.classList.add(classSelect);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classSelect);
            getNewQuestions();
        }, 1000)

    });
});

startGame();