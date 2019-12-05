import React, {Component} from 'react';
import './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: {},
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            quiz: [
                {
                    question: 'Какого цвета небо?',
                    rightAnswerId: 2,
                    id: 1,
                    answers: [
                        {text: 'Черный', id: 1},
                        {text: 'Синий', id: 2},
                        {text: 'Красный', id: 3},
                        {text: 'Зеленый', id: 4},
                    ]
                },
                {
                    question: 'Кто такой Ленин?',
                    rightAnswerId: 4,
                    id: 2,
                    answers: [
                        {text: 'Чёрт', id: 1},
                        {text: 'Убийца', id: 2},
                        {text: 'Лжец', id: 3},
                        {text: 'Все варианты', id: 4},
                    ]
                }
            ]
        }
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];

            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout);
            }, 1000);


        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }


    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 ===  this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    }

    render() {
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;
