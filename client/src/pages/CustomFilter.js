import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import { SHOP_ROUTE } from '../utils/constants';
import '../utils/style.css';
const questions = [
  {
    id: 0,
    title: 'Что вы хотите купить?',
    variants: ['ноутбук', 'составляющую компьютера', 'смартфон'],
  },
  {
    id: 1,
    title: 'Какая компьютерная компонента вас интересует?',
    variants: ['ОЗУ', 'видеокарта', 'процессор'],
  },
  {
    id: 2,
    title: 'Для каких целей вы хотите приобрести ноутбук?',
    variants: ['серфинг в интернете', 'программирование', 'игровой/для монтажа'],
  },
  {
    id: 3,
    title: 'В какой ценовой категории вы хотите совершить покупку?',
    variants: ['До 30 т.р.', 'До 70 т.р.', 'Неважно'],
  },
];

const CustomFilter = () => {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState(questions[step]);
  const [answers, setAnswers] = useState([]);

  //   const question = questions[step];
  const navigate = useNavigate();

  useEffect(() => {
    setQuestion(questions[step]);
  }, [step]);

  const onClickVariant = (text) => {
    if (text === 'ноутбук') {
      setStep(step + 2);
    } else if (text === 'ОЗУ' || text === 'видеокарта' || text === 'процессор') {
      setStep(step + 2);
    } else if (text === 'смартфон') {
      setStep(questions.length - 1);
    } else {
      setStep(step + 1);
    }
    if (text !== 'составляющую компьютера') {
      setAnswers([...answers, text]);
    }
  };
  return (
    <div className="filterPage">
      {step !== questions.length ? (
        <Question
          step={step}
          onClickVariant={onClickVariant}
          question={question}
          questions={questions}
        />
      ) : (
        <Button
          variant={'outline-light'}
          className="ms-4"
          onClick={() => navigate(SHOP_ROUTE, { replace: true, state: [answers] })}
        >
          Ознакомиться с вариантами
        </Button>
      )}
    </div>
  );
};

export default CustomFilter;
