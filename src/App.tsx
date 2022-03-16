import React, { useState } from 'react';
import './index.css'
import {fetchQuizQuestions} from './API';
// components
import QuestionCard from './components/QuestionCard';

//types
import { QuestionState, Difficulty } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS=10;


const App=()=> {

   const [loading,setLoading] = useState(false);
  const [questions,setquestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver,setGameOver]= useState(true);
  
console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))
  const startTrivia = async()=>{
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY,
      );
      setquestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
  }
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{

  }

  const nextQuestion =()=>{

  }
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {/* We want to show 'start' button only if gameover or useranswers length is equal to no of questions */}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?(
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      ): null}
      {! gameOver ?<p className="score">Score:</p>:null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
      <QuestionCard 
      questionNr = {number + 1}
      totalQuestions= {TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers? userAnswers[number] : undefined}
      callback={checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS-1 ?(
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
      ) : null}
    </div>
  );
}

export default App;
