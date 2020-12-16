const finalScore=document.querySelector('.finalScore');
const recentScore=localStorage.getItem('recentScore');

finalScore.innerText=recentScore;