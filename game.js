const question=document.querySelector('.question');
const choices=document.querySelector('.choise-answer');

let currentQuestion={};   // aktualne pytania
let acceptAnswers= true;
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
    },
    
];


const correct=10;
const maxQuestions=3;

startGame=()=>{
    questionsCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestions();
}

getNewQuestions=()=>{
    questionsCounter++;
    const questionIndex= Math.floor(Math.random()* availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>{
        const number = choice.dataset['number'];
        choice.innerText=currentQuestion['choice' + number];
    });
};

startGame();