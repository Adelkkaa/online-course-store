import React from 'react';
import '../utils/style.css';

const Question = ({ step, question, onClickVariant, questions }) => {
  const procentage = Math.round((step / questions.length) * 100);

  return (
    <div className="filter">
      <div className="progress">
        <div style={{ width: `${procentage}%` }} className="progress__inner"></div>
      </div>

      <h1>{question.title}</h1>

      <ul>
        {question.variants.map((text, index) => (
          // При клике будет выводится новый вопрос по индексу
          <li onClick={() => onClickVariant(text)} key={text}>
            {' '}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
