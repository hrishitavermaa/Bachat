import React, { useState } from 'react';
import './Quiz.css';

const questions = [
  { question: 'What is 2 + 2?', answers: ['3', '4', '5'], correct: '4' },
  { question: 'What is the capital of France?', answers: ['Berlin', 'Madrid', 'Paris'], correct: 'Paris' },
  { question: 'What is the largest planet?', answers: ['Earth', 'Jupiter', 'Mars'], correct: 'Jupiter' }
];

const Quiz: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{questions[currentQuestion].question}</h3>
      <div className="quiz-answers">
        {questions[currentQuestion].answers.map(answer => (
          <button key={answer} className="quiz-answer-button" onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
