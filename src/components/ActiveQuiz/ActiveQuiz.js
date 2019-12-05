import React from 'react';
import './ActiveQuiz.scss'
import AnswerList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className='ActiveQuiz'>
        <p className='Question'>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>

        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
);

export default ActiveQuiz;
