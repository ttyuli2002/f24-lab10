import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

interface QuizState {
  selectedAnswer: string | null
}

const Quiz: React.FC = () => {
  const [quizCore] = useState(() => new QuizCore());

  const [state, setState] = useState<QuizState>({
    selectedAnswer: null,  // Initialize the selected answer.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    if (state.selectedAnswer) {
      quizCore.answerQuestion(state.selectedAnswer); 
      quizCore.nextQuestion();
      setState((prevState) => ({ ...prevState, selectedAnswer: null }));
    }
  };

  const { selectedAnswer } = state;
  const currentQuestion = quizCore.getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;