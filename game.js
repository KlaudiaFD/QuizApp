const question=document.querySelector('.question');
const choices=Array.from(document.getElementsByClassName('choice-answer'));
const scoreCounter=document.querySelector('.scoreCounter')

let currentQuestion={};   // aktualne pytania
let acceptAnswers= false;
let score=0;
let questionsCounter=0;   //licznik pytan
let availableQuestions=[];  //dostępne pytania

let questions=[];

fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=medium")
.then(res=>{
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions=loadedQuestions.results.map(loadedQuestion=>{
        const formattedQuestion={
            question: loadedQuestion.question
        };

        const answerChoices= [ ... loadedQuestion.incorrect_answers];
        formattedQuestion.answer=Math.floor(Math.random() * 3) +1;
        
        answerChoices.splice(
            formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index)=>{
            formattedQuestion["choice" + (index + 1 )] = choice;
        });

        return formattedQuestion;
    });

    startGame();
})
.catch(err=>{
    console.error(err);
})

const maxQuestions=10;

startGame=()=>{
    questionsCounter=0;
    score=0;
    availableQuestions=[ ... questions];
    getNewQuestions();
};

getNewQuestions=()=>{

    if(availableQuestions.length === 0 || questionsCounter >= maxQuestions){
        return window.location.assign('/end.html');
    } //end the game


    questionsCounter++;

    //counter of quesions
    scoreCounter.innerText= questionsCounter + '/' + maxQuestions;
    localStorage.setItem('scoreCounter', score);


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

